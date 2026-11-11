import { useState, useCallback } from 'react';
import KeyboardShortcuts from './KeyboardShortcuts'; // THÊM MỚI
import './index.css';

export default function QuizApp({ quiz, onBack }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [flagged, setFlagged] = useState({});

    const total = quiz.questions.length;
    const currentQ = quiz.questions[currentIndex];

    // THÊM MỚI: Dùng useCallback để tối ưu hóa hiệu suất cho các hàm gắn vào phím tắt
    const handleAnswer = useCallback((optionIndex) => {
        setAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
    }, [currentIndex]);

    const handlePrev = useCallback(() => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    }, []);

    const handleNext = useCallback(() => {
        setCurrentIndex(prev => Math.min(total - 1, prev + 1));
    }, [total]);

    const toggleFlag = () => {
        setFlagged({ ...flagged, [currentIndex]: !flagged[currentIndex] });
    };

    const handleSubmit = () => {
        if (!window.confirm("Bạn có chắc chắn muốn nộp bài?")) return;
        const correctCount = Object.keys(answers).filter(k => answers[k] === quiz.questions[k].answer).length;
        alert(`Đã nộp bài!\nSố câu đúng: ${correctCount}/${total}`);
    };

    return (
        <div className="app-container">
            {/* THÊM MỚI: Nhúng Component phím tắt vào đây */}
            <KeyboardShortcuts
                onAnswer={handleAnswer}
                onPrev={handlePrev}
                onNext={handleNext}
                optionsCount={currentQ.options.length}
            />

            <div className="top-bar">
                <button onClick={onBack} className="btn-back">
                    ← Quay lại sảnh
                </button>
                <h1 className="quiz-title-header">{quiz.title}</h1>
            </div>

            <div className="layout">
                <div className="main-content">
                    <div className="header">
                        <h2>Câu {currentIndex + 1} <span>/ {total}</span></h2>
                        <button
                            onClick={toggleFlag}
                            className={`btn-flag ${flagged[currentIndex] ? 'is-flagged' : ''}`}
                        >
                            {flagged[currentIndex] ? '🚩 Đã đánh dấu' : '📍 Đánh dấu'}
                        </button>
                    </div>

                    <p className="question-text">{currentQ.text}</p>

                    <div className="options-list">
                        {currentQ.options.map((option, idx) => {
                            const isAnswered = answers[currentIndex] !== undefined;
                            const isSelected = answers[currentIndex] === idx;
                            const isCorrect = currentQ.answer === idx;

                            let btnClass = "btn-option ";
                            if (isAnswered) {
                                if (isCorrect) btnClass += "correct";
                                else if (isSelected) btnClass += "incorrect";
                                else btnClass += "disabled";
                            }

                            return (
                                <button
                                    key={idx}
                                    // SỬA: Đổi gọi hàm onAnswer thành handleAnswer mới tối ưu
                                    onClick={() => handleAnswer(idx)}
                                    className={btnClass}
                                >
                                    <span className="option-text">{option}</span>
                                    {isAnswered && isCorrect && <span className="icon">✅</span>}
                                    {isAnswered && isSelected && !isCorrect && <span className="icon">❌</span>}
                                </button>
                            );
                        })}
                    </div>

                    <div className="nav-buttons">
                        <button
                            onClick={handlePrev} // SỬA
                            disabled={currentIndex === 0}
                            className="btn-nav btn-prev"
                        >
                            ← Quay lại
                        </button>
                        <button
                            onClick={handleNext} // SỬA
                            disabled={currentIndex === total - 1}
                            className="btn-nav btn-next"
                        >
                            Câu tiếp →
                        </button>
                    </div>
                </div>

                {/* CỘT PHẢI BÊN DƯỚI GIỮ NGUYÊN NHƯ CŨ */}
                <div className="sidebar">
                    <h3>Danh sách câu hỏi</h3>

                    <div className="grid-container custom-scrollbar">
                        <div className="grid">
                            {quiz.questions.map((q, idx) => {
                                const isAnswered = answers[idx] !== undefined;
                                const isCorrect = answers[idx] === q.answer;
                                const isActive = idx === currentIndex;
                                const isFlagged = flagged[idx];

                                let boxClass = "grid-item ";
                                if (isActive) boxClass += "active ";

                                if (isAnswered) {
                                    boxClass += isCorrect ? "answered-correct " : "answered-incorrect ";
                                } else if (isFlagged) {
                                    boxClass += "flagged ";
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={boxClass}
                                    >
                                        {idx + 1}
                                        {isFlagged && <span className="flag-badge">🚩</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="sidebar-footer">
                        <div className="progress">
                            <span>Tiến độ:</span>
                            <span className="progress-number">
                                {Object.keys(answers).length} / {total}
                            </span>
                        </div>
                        <button onClick={handleSubmit} className="btn-submit">
                            Nộp bài thi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}