interface input {
  target: number
  hoursEachDay: number[]
}

export const parseArguments = (args: string[]) : input => {
  if (args.length < 4) throw new Error('Not enough arguments!');

  const target = Number(args[2]);
  const hoursEachDay = args.slice(3).map(x => Number(x));
  const arrayContainsNaN = hoursEachDay.some(x => isNaN(x));

  if (isNaN(target) && arrayContainsNaN) {
    throw new Error('');
  }

  return {
    target,
    hoursEachDay
  };
};

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

export const exerciseCalculator = (target: number, hoursEachDay: number[]) : Result => {
  const periodLength = hoursEachDay.length;
  const trainingDays = hoursEachDay.filter(x => x !== 0).length;
  const totalHours = hoursEachDay.reduce((total, hours) => total + hours);
  const average = totalHours / periodLength;
  const success = average >= target;
  let rating;
  let ratingDescription;

  if (success) {
    rating = 3;
    ratingDescription = 'Well done! You hit your training target.';
  } else if ((average / target) >= 0.75) {
    rating = 2;
    ratingDescription = 'Almost. You were close to your training target.';
  } else {
    rating = 1;
    ratingDescription = 'Looks like you need to train more. Pick it up.';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, hoursEachDay } = parseArguments(process.argv);
  console.log(exerciseCalculator(target, hoursEachDay));
} catch (error) {
  console.log('ERR! Something happened.', error.message);
}