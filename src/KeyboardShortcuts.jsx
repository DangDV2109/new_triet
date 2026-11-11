import { useEffect } from 'react';

export default function KeyboardShortcuts({ onAnswer, onPrev, onNext, optionsCount }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Bỏ qua nếu người dùng đang gõ phím trong ô input (đề phòng sau này có)
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key) {
                case '1':
                    if (optionsCount > 0) onAnswer(0); // Chọn đáp án A
                    break;
                case '2':
                    if (optionsCount > 1) onAnswer(1); // Chọn đáp án B
                    break;
                case '3':
                    if (optionsCount > 2) onAnswer(2); // Chọn đáp án C
                    break;
                case '4':
                    if (optionsCount > 3) onAnswer(3); // Chọn đáp án D
                    break;
                case 'ArrowLeft':
                    onPrev(); // Mũi tên trái
                    break;
                case 'ArrowRight':
                    onNext(); // Mũi tên phải
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Dọn dẹp event listener khi component bị hủy
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onAnswer, onPrev, onNext, optionsCount]);

    return null; // Component này chạy ngầm, không hiển thị UI
}