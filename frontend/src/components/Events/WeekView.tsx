import React, { useRef } from "react";
import styled from "styled-components";
import { ICell, IPosition } from "../../types";
import { ID } from "../../utils";

const StyledWeekLayout = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr;
`;
const StyledText = styled.h3<{ align?: string }>`
  font-size: 1.2rem;
  color: #424242;
  text-align: ${props => props.align || "left"};
`;
const StyledWeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const StyledWeekCell = styled.div`
  height: 5rem;
  background-color: "transparent";
  border: 1px solid #f3f4f9;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.2rem;
  overflow: hidden;
`;

const StyledWeekCellText = styled.p`
  font-size: 1.2rem;
  color: "#b8bac3";
`;

const StyledWeekCellEvent = styled.div`
  padding: 0.5rem;
  border-radius: 2px;
  background-color: #e8f5e9;
  color: #81c784;
  cursor: pointer;
  height: 100%;
  margin-right: 0.1rem;
  flex: 1;
`;
const StyledSidebarContainer = styled.div`
  grid-row: 1 / span 2;
`;
type DragEventType = React.DragEvent<HTMLDivElement>;

interface HeaderProps {
  events: ICell[];
  onCellEventClick: (id: string) => void;
  onClick: (date: string, weekRow: number, position?: IPosition) => void;
  onDragStart: (e: DragEventType, id: string) => void;
  onDrop: (e: DragEventType, dateStr: string, weekRow: number) => void;
  onDragOver: (e: DragEventType) => void;
}

const times = Array.from(Array(24).keys()).map(index =>
  index < 10 ? `0${index}:00` : `${index}:00`
);

interface WeekCellProps {
  eventItem: ICell;
  onClick: (date: string, weekRow: number, position?: IPosition) => void;
  onCellEventClick: (id: string) => void;
  weekRow: number;
  onDragStart: (e: DragEventType, id: string) => void;
  onDrop: (e: DragEventType, dateStr: string, weekRow: number) => void;
  onDragOver: (e: DragEventType) => void;
}
type ChangeEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;

const WeekCell: React.FC<WeekCellProps> = ({
  onClick,
  eventItem,
  onCellEventClick,
  weekRow,
  onDragOver,
  onDragStart,
  onDrop
}) => {
  const { dateStr, events } = eventItem;
  const cellRef = useRef<HTMLDivElement>(null);
  const handleClick = (dateStr: string) => {
    const position = cellRef.current && cellRef.current.getBoundingClientRect();
    if (position) onClick(dateStr, weekRow, position);
    else onClick(dateStr, weekRow);
  };
  const handleOnCellEventClick = (e: ChangeEventType, id: string) => {
    e.stopPropagation();
    onCellEventClick(id);
  };
  return (
    <>
      <StyledWeekCell
        onClick={() => handleClick(dateStr)}
        onDrop={(e: DragEventType) => onDrop(e, dateStr, weekRow)}
        onDragOver={(e: DragEventType) => onDragOver(e)}
        ref={cellRef}
      >
        {events.length > 0 &&
          events.map(
            event =>
              event.weekRow === weekRow && (
                <StyledWeekCellEvent
                  key={event.id}
                  draggable="true"
                  onDragStart={(e: DragEventType) => onDragStart(e, event.id)}
                  onClick={(e: ChangeEventType) =>
                    handleOnCellEventClick(e, event.id)
                  }
                >
                  <StyledWeekCellText>
                    {event.task && event.task.name}
                  </StyledWeekCellText>
                </StyledWeekCellEvent>
              )
          )}
      </StyledWeekCell>
    </>
  );
};

const WeekView: React.FC<HeaderProps> = ({
  events,
  onCellEventClick,
  onClick,
  onDragOver,
  onDragStart,
  onDrop
}) => {
  return (
    <>
      <StyledWeekLayout>
        <StyledSidebarContainer>
          {times.map((time, i) => (
            <StyledWeekCell key={i}>
              <StyledText align="center">{time}</StyledText>
            </StyledWeekCell>
          ))}
        </StyledSidebarContainer>
        <StyledWeekContainer>
          {times.map((_, i) =>
            events.map(eventItem => (
              <WeekCell
                key={ID()}
                eventItem={eventItem}
                onCellEventClick={onCellEventClick}
                onClick={onClick}
                weekRow={i}
                onDragOver={onDragOver}
                onDragStart={onDragStart}
                onDrop={onDrop}
              />
            ))
          )}
        </StyledWeekContainer>
      </StyledWeekLayout>
    </>
  );
};

export default WeekView;
