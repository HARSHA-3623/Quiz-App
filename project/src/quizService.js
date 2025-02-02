// quizService.js
export async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.questions.slice(0, 10).map(question => ({
        id: question.id,
        description: question.description,
        options: question.options.map(option => ({
          description: option.description,
          is_correct: option.is_correct
        }))
      }));
    } catch (error) {
      console.error(`Could not fetch data: ${error}`);
      throw error;
    }
  }
  