"use client";
import { useGlobalState } from "@/context/globalProvider";
import { add } from "@/utils/Icons";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button";

interface EditContentProps {
  task: {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
    id: string;
  };
}

function EditContent({ task }: EditContentProps) {
  const { title, description, date, isCompleted, isImportant, id } = task;

  const [updatedTitle, setTitle] = useState(title);
  const [updatedDescription, setDescription] = useState(description);
  const [updatedDate, setDate] = useState(date);
  const [completed, setCompleted] = useState(isCompleted);
  const [important, setImportant] = useState(isImportant);

  const { theme, allTasks, closeModal } = useGlobalState();

  const handleChange =
    (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, checked } = e.target as HTMLInputElement;
      switch (name) {
        case "title":
          setTitle(value);
          break;
        case "description":
          setDescription(value);
          break;
        case "date":
          setDate(value);
          break;
        case "completed":
          setCompleted(checked);
          break;
        case "important":
          setImportant(checked);
          break;
        default:
          break;
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTask = {
      title: updatedTitle,
      description: updatedDescription,
      date: updatedDate,
      completed,
      important,
    };

    try {
      const res = await axios.put(`/api/tasks/${id}`, updatedTask);

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Task updated successfully.");
        allTasks();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <EditContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Edit a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={updatedTitle} // Change here
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g, Watch a video from Fireship."
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={updatedDescription} // Change here
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="e.g, Watch a video about Next.js Auth"
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          value={updatedDate} // Change here
          onChange={handleChange("date")}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          checked={completed} // Change here
          onChange={handleChange("completed")}
          type="checkbox"
          name="completed"
          id="completed"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          checked={important} // Change here
          onChange={handleChange("important")}
          type="checkbox"
          name="important"
          id="important"
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Edit Task"
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </EditContentStyled>
  );
}

const EditContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default EditContent;
