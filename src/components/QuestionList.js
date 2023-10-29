import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
function QuestionList({ questionData }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data line 10", data);
        const newData = data.map((question) => {
          return (
            <QuestionItem
              key={question.prompt}
              question={question}
              handleDelete={handleDelete}
            />
          );
        });
        console.log("newData line 14", newData);
        setQuestions(newData);
      });
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Question with ID", id, "has been deleted.");

        // Remove the deleted question from the questions array
        setQuestions((prevQuestions) => {
          return prevQuestions.filter(
            (question) => question.props.question.id !== id
          );
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors that occur during the request
      });
  }

  console.log("Questions line 18:", questions);
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions}</ul>
    </section>
  );
}

export default QuestionList;
