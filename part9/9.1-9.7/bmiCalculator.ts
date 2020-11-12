export const bmiCalculator = (height: number, mass: number): string => {
  const bmi = mass / Math.pow(height / 100, 2);
  if (bmi < 15) return "Very severely underweight";
  if (bmi > 15 && bmi <= 16) return "Severely underweight";
  if (bmi > 16 && bmi <= 18.5) return "Underweight";
  if (bmi > 18.5 && bmi <= 25) return "Normal (healthy weight)";
  if (bmi > 25 && bmi <= 30) return "Overweight";
  if (bmi > 30 && bmi <= 35) return "Obese Class I (Moderately obese)";
  if (bmi > 35 && bmi <= 40) return "Obese Class II (Severly obese)";
  if (bmi > 40) return "Obese Class III (Very severely obese)";

  return 'Something went wrong.';
};

interface stats {
  height: number,
  mass: number
}

const parseArguments = (args: Array<string>): stats => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

if (require.main === module) {
  try {
    const { height, mass } = parseArguments(process.argv);
    console.log(bmiCalculator(height, mass));
  } catch (error) {
    console.log('ERR! Something happened.', error.message);
  }
}