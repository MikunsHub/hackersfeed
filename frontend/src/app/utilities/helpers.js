export const generateRandomBy = () => {
    const randomWords = [
      "Anonymous",
      "Brave",
      "Curious",
      "Daring",
      "Energetic",
      "Fearless",
      "Grateful",
      "Hopeful",
      "Inquisitive",
      "Joyful",
      "Kindhearted",
      "Lively",
      "Mindful",
      "Optimistic",
      "Passionate",
      "Quirky",
      "Resilient",
      "Spirited",
      "Thoughtful",
      "Unstoppable",
      "Vibrant",
      "Witty",
      "Xenial",
      "Youthful",
      "Zealous",
    ];
  
    const randomWord =
      randomWords[Math.floor(Math.random() * randomWords.length)];
  
    return `${randomWord} ${Math.floor(Math.random() * 10000)}`;
  };


  export const formatDate= (datetime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(datetime).toLocaleDateString(undefined, options);
  }

