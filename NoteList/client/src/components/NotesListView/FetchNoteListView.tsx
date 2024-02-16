import { useQuery } from "@tanstack/react-query";
import { fetchNoteList } from "../../api/Note";
import { queryClient } from "../../api/QueryClient";
import { Loader } from "../Loader";
import { NotesListView } from ".";
import { NoteForm } from "../NoteForm";
import { UserView } from "../UserView";
import { User } from "../../api/User";
import { FC, useState, useEffect } from "react";

interface FetchNoteListViewProps {
  user: User;
}

export const FetchNoteListView: FC<FetchNoteListViewProps> = ({ user }) => {
  const [page, setPage] = useState(1);
  const [selectNext, setSelectNext] = useState(false);
  const [selectPrev, setSelectPrev] = useState(false);

  const noteListQuery = useQuery({
    queryFn: () => fetchNoteList({
      page: page - 1,
      pageSize: 5,
      searchString: ""
    }),
    queryKey: ["notes"],
  }, queryClient);

  const handleNextClick = () => {
    if (selectNext) {
      setPage(page => page + 1);
    }
  }

  const handlePrevClick = () => {
    if (selectPrev) {
      setPage(page => page - 1);
    }
  }

  const PAGE_COUNT = noteListQuery.data?.pageCount;

  useEffect(() => {
    if (PAGE_COUNT === 1) {
      setSelectNext(false);
      setSelectPrev(false);
    } else {
      if (page === 1) {
        setSelectNext(true);
        setSelectPrev(false);
      } else if (page === PAGE_COUNT) {
        setSelectNext(false);
        setSelectPrev(true);
      } else {
        setSelectNext(true);
        setSelectPrev(true);
      }
    }

    noteListQuery.refetch();
  }, [page]);

  switch (noteListQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return (
        <div className="container account__container">
          <UserView user={user} />
          <NoteForm />
          <NotesListView
            noteList={noteListQuery.data?.list}
            pageSelectProps={{
              currentPage: page,
              canSelectNext: selectNext,
              canSelectPrev: selectPrev,
              onNextClick: handleNextClick,
              onPrevClick: handlePrevClick,
              isLoading: noteListQuery.isFetching
            }}
          />

        </div>
      );
    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
          <button onClick={() => noteListQuery.refetch()}>Повторить запрос</button>
        </div>
      );
  }
};