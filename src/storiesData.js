export const STORIES = {
  1: {
    title: "Lena's Morning Bus",
    text: `Lena wakes up early every weekday to catch the 7:15 bus to school. She likes to sit by the window and listen to music while she watches the streets go by. One rainy morning, the bus is ten minutes late. Lena starts to worry that she will miss the beginning of her math test. When the bus finally arrives, she quickly finds a seat and reviews her notes one last time.`,
    questions: [
      {
        prompt: "Why does Lena wake up early on weekdays?",
        options: [
          "She wants to catch the 7:15 bus to school.",
          "She likes to eat a big breakfast.",
          "She needs extra time to do homework.",
          "She walks to school with her friends."
        ],
        correctIndex: 0
      },
      {
        prompt: "How does Lena feel when the bus is late?",
        options: [
          "Excited to have more free time.",
          "Worried she will miss part of her test.",
          "Angry at her friends.",
          "Happy because she dislikes math."
        ],
        correctIndex: 1
      },
      {
        prompt: "What does Lena do after she finds a seat?",
        options: [
          "She falls asleep immediately.",
          "She calls her teacher.",
          "She reviews her notes for the test.",
          "She gets off at the next stop."
        ],
        correctIndex: 2
      }
    ]
  },
  2: {
    title: "The Community Garden",
    text: `In the center of the city, there is a small community garden between two tall apartment buildings. Neighbors grow vegetables, herbs, and flowers in raised wooden beds. Every Saturday morning, volunteers gather to water the plants, pull weeds, and share gardening tips. At the end of each summer, the community hosts a picnic where everyone brings a dish made from something grown in the garden.`,
    questions: [
      {
        prompt: "Where is the community garden located?",
        options: [
          "In a large park outside the city.",
          "Between two tall apartment buildings.",
          "Next to a busy shopping mall.",
          "On the roof of a school."
        ],
        correctIndex: 1
      },
      {
        prompt: "What do volunteers usually do on Saturday mornings?",
        options: [
          "Sell vegetables at a market.",
          "Watch movies together.",
          "Water plants and pull weeds.",
          "Paint the apartment buildings."
        ],
        correctIndex: 2
      },
      {
        prompt: "What happens at the end of each summer?",
        options: [
          "A picnic with dishes made from garden produce.",
          "A contest for the tallest building.",
          "A meeting to close the garden forever.",
          "A parade through the city streets."
        ],
        correctIndex: 0
      }
    ]
  },
  3: {
    title: "Sam's New Hobby",
    text: `Sam used to spend most of his free time playing video games. One day, his aunt gave him an old camera and showed him how to use it. Sam started taking photos of everything: his dog, the sky at sunset, and small details like raindrops on leaves. He joined an online group where people share their pictures and give feedback. Now Sam plans his weekends around new places he can explore with his camera.`,
    questions: [
      {
        prompt: "What did Sam's aunt give him?",
        options: [
          "A new laptop for gaming.",
          "An old camera to take photos.",
          "A book about nature.",
          "A ticket to a concert."
        ],
        correctIndex: 1
      },
      {
        prompt: "What does Sam often photograph?",
        options: [
          "Only his friends at school.",
          "Mostly cars and buses.",
          "Things like his dog and raindrops on leaves.",
          "Only famous buildings in the city."
        ],
        correctIndex: 2
      },
      {
        prompt: "How has Sam's weekend routine changed?",
        options: [
          "He stays home and plays more games.",
          "He plans trips to new places to take photos.",
          "He spends all day watching photography videos.",
          "He stops going outside completely."
        ],
        correctIndex: 1
      }
    ]
  },
  4: {
    title: "The Library Robot",
    text: `The local library recently introduced a small robot that helps visitors find books. The robot moves slowly along the aisles and has a screen on its chest. When people type a title or author, the robot shows a map and leads them to the correct shelf. Children especially enjoy following the robot and sometimes give it stickers as decoration.`,
    questions: [
      {
        prompt: "What is the main job of the library robot?",
        options: [
          "To check books out at the front desk.",
          "To help visitors find the correct shelf.",
          "To read stories aloud to children.",
          "To repair broken computers."
        ],
        correctIndex: 1
      },
      {
        prompt: "How do people tell the robot which book they want?",
        options: [
          "By calling the library on the phone.",
          "By writing the title on paper.",
          "By typing on the screen on its chest.",
          "By speaking into a microphone."
        ],
        correctIndex: 2
      },
      {
        prompt: "How do children interact with the robot?",
        options: [
          "They ignore it completely.",
          "They follow it and sometimes add stickers.",
          "They turn it off when it passes by.",
          "They use it only for homework."
        ],
        correctIndex: 1
      }
    ]
  },
  5: {
    title: "A Rainy Day Decision",
    text: `On Saturday, Mia and her brother planned to go to the park. Dark clouds gathered in the sky, and soon heavy rain began to fall. Mia suggested they cancel their plans, but her brother wanted to go anyway. After checking the weather report, they saw the rain would last all afternoon. Instead of arguing, they decided to build a blanket fort in the living room and watch a movie together.`,
    questions: [
      {
        prompt: "What changed Mia and her brother's plans?",
        options: [
          "Their friends could not come.",
          "The park was closed for repairs.",
          "Heavy rain started to fall.",
          "They forgot about the trip."
        ],
        correctIndex: 2
      },
      {
        prompt: "How did they know the rain would continue?",
        options: [
          "They watched the weather report.",
          "They called their teacher.",
          "They looked at old photos.",
          "They asked their neighbors."
        ],
        correctIndex: 0
      },
      {
        prompt: "What did they finally decide to do?",
        options: [
          "Go to the park with umbrellas.",
          "Stay bored in their rooms.",
          "Visit the library alone.",
          "Build a blanket fort and watch a movie."
        ],
        correctIndex: 3
      }
    ]
  }
};

export function getStory(lessonId) {
  const numeric = Number.parseInt(lessonId, 10);
  if (Number.isNaN(numeric)) return null;
  return STORIES[numeric] || null;
}

