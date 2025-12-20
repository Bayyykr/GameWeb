export const difficultyManager = (score) => {
    if (score > 100) return 'hard';
    if (score > 50) return 'medium';
    return 'easy';
};
