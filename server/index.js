const express = require("express");
const marked = require('marked');
const app = express();
const port = 3000;
var jwt = require("jsonwebtoken");
const { auth } = require("./middleware");
let USER_ID_COUNTER = 1;
const USERS = [];
const JWT_SECRET = "secret";
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
app.use(cors());
app.use(jsonParser);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//<code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;"></code>
const PROBLEMS = [
    {
        problemId: "1",
        title: 'Two Sum',
        description: `Given an <strong>array</strong> of <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">nums</code> <and an integer <strong>target</strong>, return indices of the two numbers such that they add up to <strong>target</strong>. You may assume that each input would have exactly one solution, and you may not use the same element twice`,
        difficulty: 'Easy',
        acceptance: '48.6%',
        examples: [
            {
                input: 'nums = [2,7,11,15], target = 9',
                output: '[0,1]'
            },
            {
                input: 'nums = [3,2,4], target = 6',
                output: '[1,2]'
            }
        ]
    },
    {
        problemId: "2",
        title: 'Add Two Numbers',
        description: 'You are given two non-empty linked lists representing two  <strong>non-negative</strong> integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a <strong>linked list</strong>.',
        difficulty: 'Medium',
        acceptance: '38.9%',
        examples: [
            {
                input: 'l1 = [2,4,3], l2 = [5,6,4]',
                output: '[7,0,8]'
            },
            {
                input: 'l1 = [0], l2 = [0]',
                output: '[0]'
            }
        ]
    },
    {
        problemId: "3",
        title: 'Longest Substring Without Repeating Characters',
        description: 'Given a string <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">s</code>, find the <strong>length</strong> of the longest substring without repeating characters.',
        difficulty: 'Medium',
        acceptance: '33.4%',
        examples: [
            {
                input: 's = "abcabcbb"',
                output: '3'
            },
            {
                input: 's = "bbbbb"',
                output: '1'
            }
        ]
    },
    {
        problemId: "4",
        title: 'Median of Two Sorted Arrays',
        description: 'Given two sorted arrays <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">nums1</code> and <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">nums2</code> of size <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">m</code> and <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">n</code> respectively, return the <strong>median</strong> of the two sorted arrays.',
        difficulty: 'Hard',
        acceptance: '29.7%',
        examples: [
            {
                input: 'nums1 = [1,3], nums2 = [2]',
                output: '2.0'
            },
            {
                input: 'nums1 = [1,2], nums2 = [3,4]',
                output: '2.5'
            }
        ]
    },
    {
        problemId: "5",
        title: 'Longest Palindromic Substring',
        description: 'Given a string <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">s</code>, return the <strong>longest palindromic substring</strong> in s.',
        difficulty: 'Medium',
        acceptance: '31.4%',
        examples: [
            {
                input: 's = "babad"',
                output: '"bab"'
            },
            {
                input: 's = "cbbd"',
                output: '"bb"'
            }
        ]
    },
    {
        problemId: "6",
        title: 'Zigzag Conversion',
        description: 'Convert a string <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">s</code> to a zigzag pattern on a given number of <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">rows</code> and return the <strong>string</strong> read line by line.',
        difficulty: 'Medium',
        acceptance: '43.2%',
        examples: [
            {
                input: 's = "PAYPALISHIRING", numRows = 3',
                output: '"PAHNAPLSIIGYIR"'
            },
            {
                input: 's = "PAYPALISHIRING", numRows = 4',
                output: '"PINALSIGYAHRPI"'
            }
        ]
    },
    {
        problemId: "7",
        title: 'Reverse Integer',
        description: 'Given a signed 32-bit integer <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">x</code>, return x with its digits <strong>reversed</strong>. If reversing x causes the value to go outside the signed 32-bit integer range, <strong>return 0</strong>.',
        difficulty: 'Medium',
        acceptance: '26.9%',
        examples: [
            {
                input: 'x = 123',
                output: '321'
            },
            {
                input: 'x = -123',
                output: '-321'
            }
        ]
    },
    {
        problemId: "8",
        title: 'String to Integer (atoi)',
        description: 'Implement the <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">myAtoi(string s)</code> function, which converts a string to a 32-bit signed integer.',
        difficulty: 'Medium',
        acceptance: '16.5%',
        examples: [
            {
                input: 's = "42"',
                output: '42'
            },
            {
                input: 's = "   -42"',
                output: '-42'
            }
        ]
    },
    {
        problemId: "9",
        title: 'Palindrome Number',
        description: 'Given an integer <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">x</code>, return <strong>true</strong> if x is a palindrome, and <strong>false</strong> otherwise.',
        difficulty: 'Easy',
        acceptance: '52.2%',
        examples: [
            {
                input: 'x = 121',
                output: 'true'
            },
            {
                input: 'x = -121',
                output: 'false'
            }
        ]
    },
    {
        problemId: "10",
        title: 'Regular Expression Matching',
        description: 'Given an input string <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">s</code> and a pattern <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">p</code>, implement regular expression matching with support for <strong>\'.\'</strong> and <strong>\'*\'</strong>.',
        difficulty: 'Hard',
        acceptance: '27.9%',
        examples: [
            {
                input: 's = "aa", p = "a"',
                output: 'false'
            },
            {
                input: 's = "aa", p = "a*"',
                output: 'true'
            }
        ]
    },
    {
        problemId: "11",
        title: 'Container With Most Water',
        description: 'Given <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">n</code> non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i are at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the <strong>most</strong> water.',
        difficulty: 'Medium',
        acceptance: '54.7%',
        examples: [
            {
                input: 'height = [1,8,6,2,5,4,8,3,7]',
                output: '49'
            },
            {
                input: 'height = [1,1]',
                output: '1'
            }
        ]
    },
    {
        problemId: "12",
        title: 'Integer to Roman',
        description: 'Given an <strong>integer</strong>, convert it to a roman numeral.',
        difficulty: 'Medium',
        acceptance: '58.6%',
        examples: [
            {
                input: 'num = 3',
                output: '"III"'
            },
            {
                input: 'num = 58',
                output: '"LVIII"'
            }
        ]
    },
    {
        problemId: "13",
        title: 'Roman to Integer',
        description: 'Given a roman numeral, convert it to an <strong>integer</strong>.',
        difficulty: 'Easy',
        acceptance: '57.1%',
        examples: [
            {
                input: 's = "III"',
                output: '3'
            },
            {
                input: 's = "IV"',
                output: '4'
            }
        ]
    },
    {
        problemId: "14",
        title: 'Longest Common Prefix',
        description: 'Write a function to find the <strong>longest common prefix</strong> string amongst an array of strings. If there is no common prefix, return an empty string "".',
        difficulty: 'Easy',
        acceptance: '35.1%',
        examples: [
            {
                input: 'strs = ["flower","flow","flight"]',
                output: '"fl"'
            },
            {
                input: 'strs = ["dog","racecar","car"]',
                output: '""'
            }
        ]
    },
    {
        problemId: "15",
        title: '3Sum',
        description: 'Given an integer array <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">nums</code>, return all the triplets <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">[numsp[i], nums[j], nums[k]]</code> such that <code style="background-color: #f2f2f2; padding: 0.1em 0.3em; border-radius: 3px;">i != j, i != k, and j != k, </code> and <strong>nums[i] + nums[j] + nums[k] == 0</strong>.',
        difficulty: 'Medium',
        acceptance: '29.3%',
        examples: [
            {
                input: 'nums = [-1,0,1,2,-1,-4]',
                output: '[[-1,-1,2],[-1,0,1]]'
            },
            {
                input: 'nums = [0,1,1]',
                output: '[]'
            }
        ]
    },
    {
        problemId: "16",
        title: 'Letter Combinations of a Phone Number',
        description: 'Given a <strong>string</strong> containing digits from 2-9 inclusive, return all <strong>possible letter combinations</strong> that the number could represent.',
        difficulty: 'Medium',
        acceptance: '52.4%',
        examples: [
            {
                input: 'digits = "23"',
                output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]'
            },
            {
                input: 'digits = ""',
                output: '[]'
            }
        ]
    },
];

const SUBMISSIONS = [];

app.get("/", (req, res) => {
    res.json({
      msg: "hello world",
    });
  });
  
  app.get('/problems', (req, res) => {
    const filteredProblems = PROBLEMS.map((x) => ({
      problemId: x.problemId,
      difficulty: x.difficulty,
      acceptance: x.acceptance,
      title: x.title,
    }));
  
    res.json({
      problems: filteredProblems,
    });
  });

  app.get('/problem/:id', (req, res) => {
    const id = req.params.id.trim();  // Remove leading/trailing spaces
    console.log("Request ID:", id, "Type:", typeof id);
  
    const problem = PROBLEMS.find((x) => x.problemId === id);
    console.log("Found Problem:", problem);
  
    if (!problem) {
      console.log("Problem not found");
      return res.status(404).json({ error: "Problem not found" });
    }
  
    res.json({
      problem,
    });
  });

  
  app.get("/me", auth, (req, res) => {
    const user = USERS.find((x) => x.id === req.userId);
    res.json({ email: user.email, id: user.id });
  });
  
  app.get("/submissions/:problemId", auth, (req, res) => {
    const problemId = req.params.problemId;
    const submissions = SUBMISSIONS.filter(
      (x) => x.problemId === problemId && x.userId === req.userId
    );
    res.json({
      submissions,
    });
  });
  
  app.post("/submission", auth, (req, res) => {
    const isCorrect = Math.random() < 0.5;
    const problemId = req.body.problemId;
    const submission = req.body.submission;
  
    if (isCorrect) {
      SUBMISSIONS.push({
        submission,
        problemId,
        userId: req.userId,
        status: "AC",
      });
      return res.json({
        status: "AC",
      });
    } else {
      SUBMISSIONS.push({
        submission,
        problemId,
        userId: req.userId,
        status: "WA",
      });
      return res.json({
        status: "WA",
      });
    }
  });
  
  app.post("/signup", (req, res) => {
    const { username, password, email } = req.body;

    if (USERS.find(x => x.email === email)) {
        return res.status(403).json({ msg: "Email already exists" });
    }

    USERS.push({ username, password, email, id: USER_ID_COUNTER++ });

    return res.json({ msg: "Success" });
});
  
  app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = USERS.find((x) => x.email === email);
  
    if (!user) {
      return res.status(403).json({ msg: "User not found" });
    }
  
    if (user.password !== password) {
      return res.status(403).json({ msg: "Incorrect password" });
    }
  
    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET
    );
  
    return res.json({ token });
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });