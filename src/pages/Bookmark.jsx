import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {
  doc,
  query,
  collection,
  onSnapshot,
  where,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCheck,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { drugData } from "../atoms";

const ZeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100vh;
  font-size: 1.25rem;
  > svg {
    font-size: 2rem;
    color: var(--main-color);
  }
`;

const Container = styled.section`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  background: #f7f7f7;
  > h2 {
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    margin-top: 1.875rem;
  }
  .bookmark_list {
    width: 90%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0.5rem 1rem 1.5rem;
    margin-bottom: 5rem;
    background: #fff;
    > div {
      min-height: 5rem;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      border-bottom: 1px solid #999;
      padding: 0.75rem 0;
      cursor: pointer;
      > input {
        display: none;
      }
      > input:checked + label {
        background-color: var(--main-color);
        border-color: var(--main-color);
        border-radius: 0.25rem;
        > svg {
          display: block;
          color: #fff;
        }
      }
      > label {
        min-width: 1.25rem;
        height: 1.25rem;
        border: 1.5px solid #999;
        transition: all 0.3s;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        > svg {
          display: none;
        }
      }
      > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        p:nth-child(1) {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: normal;
        }
        p:nth-child(2) {
          font-size: 0.9rem;
        }
      }
    }
  }
  .addBookmark {
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
    font-size: 1.125rem;
    color: #555;
    white-space: nowrap;
    > span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      > svg {
        color: var(--main-color);
        margin-bottom: 0.25rem;
      }
    }
    > div {
      width: 0.1rem;
      height: 2.25rem;
      background-color: #ccc;
    }
  }
`;

const Bookmark = () => {
  const [drugInfo, setDrugInfo] = useRecoilState(drugData);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userBookmark, setUserBookmark] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [bookmarkBox, setBookmarkBox] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const getUserBookmark = async () => {
      setIsLoading(true);
      try {
        const bookmartQuery = query(
          collection(db, "bookmark"),
          where("uid", "==", user.uid)
        );

        const unsubscribe = onSnapshot(bookmartQuery, (snapshot) => {
          const bookmarks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUserBookmark(bookmarks[0].Bookmark);
        });
        return () => unsubscribe && unsubscribe();
      } catch (err) {
        console.error("유저 북마크 가져오기 실패", err);
      } finally {
        setIsLoading(false);
      }
    };

    getUserBookmark();
  }, [user]);

  useEffect(() => {
    setCheckedItems(
      userBookmark.map((item) => ({
        itemSeq: item.itemSeq,
        itemName: item.itemName,
        entpName: item.entpName,
        isChecked: false,
      }))
    );
  }, []);

  useEffect(() => {
    setBookmarkBox(checkedItems.some((item) => item.isChecked));
  }, [checkedItems]);

  const checkEvent = (e, item) => {
    e.stopPropagation();
    e.preventDefault();

    setCheckedItems((prev) => {
      const existingItem = prev.find(
        (checkedItem) => checkedItem.itemSeq === item.itemSeq
      );

      if (existingItem) {
        return prev.map((checkedItem) =>
          checkedItem.itemSeq === item.itemSeq
            ? { ...checkedItem, isChecked: !checkedItem.isChecked }
            : checkedItem
        );
      }

      return [
        ...prev,
        {
          itemSeq: item.itemSeq,
          itemName: item.itemName,
          entpName: item.entpName,
          isChecked: true,
        },
      ];
    });
  };

  const selectDelete = () => {
    try {
      const selectedItems = checkedItems.filter((item) => item.isChecked);

      const bookmarkRef = doc(db, "bookmark", user.uid);

      selectedItems.forEach((item) => {
        updateDoc(bookmarkRef, {
          Bookmark: arrayRemove(item),
        });
      });

      setCheckedItems([]);
      setBookmarkBox(false);
    } catch (error) {
      console.error("선택 삭제 실패:", error);
    }
  };

  const deleteAll = () => {
    userBookmark.forEach((item) => {
      updateDoc(doc(db, "bookmark", user.uid), {
        Bookmark: arrayRemove(item),
      });
    });
  };

  const goDrugResult = (item) => {
    setDrugInfo({});
    navigate(`/drugresult?q=${item.itemName}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && userBookmark.length === 0) {
    return (
      <ZeroContainer>
        <FontAwesomeIcon icon={faBookmark} />
        즐겨찾기가 비어있습니다
      </ZeroContainer>
    );
  }

  return (
    <Container>
      <h2>즐겨찾기</h2>
      <div className="bookmark_list">
        {userBookmark.map((item, idx) => (
          <div
            className="bookmark_item"
            key={idx}
            onClick={() => goDrugResult(item)}
          >
            <input
              type="checkbox"
              name={`check-${item.itemSeq}}`}
              id={`check-${item.itemSeq}}`}
              checked={
                checkedItems.find(
                  (checkedItem) => checkedItem.itemSeq === item.itemSeq
                )?.isChecked || false
              }
              onChange={() => {}}
            />
            <label
              htmlFor={`check-${item.itemSeq}}`}
              onClick={(e) => checkEvent(e, item)}
            >
              <FontAwesomeIcon icon={faCheck} />
            </label>
            <div>
              <p>{item.itemName}</p>
              <p>{item.entpName}</p>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {bookmarkBox && (
          <motion.div
            className="addBookmark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span onClick={selectDelete}>
              <FontAwesomeIcon icon={faXmarkCircle} />
              선택삭제
            </span>
            <div></div>
            <span onClick={deleteAll}>
              <FontAwesomeIcon icon={faBookmark} />
              전체 삭제
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Bookmark;
