// Community feed placeholder posts

export type ReelPost = {
  id: string;
  username: string;
  postedAt: string;
  hearts: number;
  saves: number;
  comments: number;
  description: string;
};

const sampleUsernames = [
  'OwenIsFried',
  'SpykeGivesMeAnA',
  'JesseEats',
  'JoshCooks',
  'SethDoesThings',
];
const sampleDates = ['2h ago', '5h ago', '1d ago', '2d ago', '3d ago', '1w ago'];
const sampleDescriptions = [
  'Tried this on a weeknight and it completely changed my meal prep routine. Swapped the garlic for roasted garlic and it was even better — highly recommend if you have a few extra minutes.',
  'Family recipe, finally wrote it down. Took three tries to get the ratio right but this version is the one. Let me know if you try it!',
  'Quick version of a dish I had on a trip last year. Not exactly the same but close enough that it brings back the memory every time.',
  'Meal prepped this for the whole week and it held up really well in the fridge. Good one to batch on a Sunday.',
];

export function makePost(index: number): ReelPost {
  return {
    id: `post-${index}`,
    username: sampleUsernames[index % sampleUsernames.length],
    postedAt: sampleDates[index % sampleDates.length],
    hearts: 20 + ((index * 37) % 400),
    saves: 2 + ((index * 11) % 90),
    comments: 1 + ((index * 7) % 60),
    description: sampleDescriptions[index % sampleDescriptions.length],
  };
}

// Sample data for posts
export const sampleComments = [
  { id: 'c1', username: 'OwenIsFried', text: 'This looks amazing, definitely trying it this weekend!' },
  { id: 'c2', username: 'SpykeGivesMeAnA', text: 'This is soooo good, I might need to give you an A+!' },
  { id: 'c3', username: 'JesseEats', text: 'Love this version, thanks for sharing 🙌' },
  { id: 'c4', username: 'JoshCooks', text: 'Swapped in chicken thighs and it still turned out great.' },
  { id: 'c5', username: 'SethDoesThings', text: 'Saving this for meal prep next week.' },
];

export const INITIAL_POST_COUNT = 6;
export const PAGE_SIZE = 4;