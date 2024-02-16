import { FC } from "react";

import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { NoteList } from "../../api/Note";
import { LogoutButton } from "../LogoutButton";
import { PageSelector } from "../PageSelector";

type PageSelectorProps = {
  currentPage: number;
  canSelectNext: boolean;
  canSelectPrev: boolean;
  onNextClick: () => void;
  onPrevClick: () => void;
  isLoading: boolean;
}

interface NotesListViewProps {
  noteList: NoteList;
  pageSelectProps: PageSelectorProps;
}

export const NotesListView: FC<NotesListViewProps> = ({
  noteList,
  pageSelectProps: {
    currentPage,
    canSelectNext,
    canSelectPrev,
    onNextClick,
    onPrevClick,
    isLoading
  }
}) => {
  return (
    <div>
      <ul className="note-list-view">
        {noteList.map((note) => (
          <li key={note.id}>
            <NoteView note={note}/>
          </li>
        ))}
      </ul>
      <LogoutButton/>
      <PageSelector
        currentPage={currentPage}
        canSelectNext={canSelectNext}
        canSelectPrev={canSelectPrev}
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
        isLoading={isLoading}
      />
    </div>
  );
};
