import { useState } from 'react';
import QuizApp from './QuizApp';
import { quizzes } from "./data/de1.js";
import { newQuiz } from './data/de2.js';
import { quizz } from './data/de3.js';
import './index.css';

// Nối danh sách đề thi: lấy toàn bộ đề cũ + đề mới
const allQuizzes = [...quizzes, ...newQuiz, ...quizz];

export default function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // MÀN HÌNH SẢNH CHỜ
  if (!selectedQuiz) {
    return (
      <div className="lobby-container">
        <h1 className="lobby-title">Hệ thống Thi Trắc nghiệm</h1>
        <div className="quiz-list">
          {allQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <h2>{quiz.title}</h2>
              <p className="quiz-desc">{quiz.description}</p>
              <div className="quiz-meta">
                <span>📚 {quiz.questions.length} câu hỏi</span>
              </div>
              <button
                onClick={() => setSelectedQuiz(quiz)}
                className="btn-start"
              >
                Bắt đầu làm bài
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // MÀN HÌNH LÀM BÀI
  return (
    <QuizApp
      quiz={selectedQuiz}
      onBack={() => setSelectedQuiz(null)}
    />
  );
}