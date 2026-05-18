const BAD_WORDS_LIST = [
  'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'nigger', 'faggot', 'cunt', 'retard',
  'bastard', 'slut', 'whore', 'motherfucker', 'cock', 'cum', 'porn', 'sex', 'ass', 'hell'
];

export const filterProfanity = (text) => {
  if (!text) return text;
  let filtered = text;
  BAD_WORDS_LIST.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filtered = filtered.replace(regex, '*'.repeat(word.length));
  });
  return filtered;
};
