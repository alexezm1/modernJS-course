// let re;

// re = /hello/;
// re = /hello/i; // i = case insensitive
// re = /hello/g; // g = global search

// console.log(re);
// console.log(re.source);

// exec() - Return result in an array or null

// const result = re.exec("hello world");
// console.log(result);
// console.log(result[0]);
// console.log(result.input);

// test() - Returns true or false if match

// const result = re.test("Hello");
// console.log(result);

// match() - Return result array or null

// const str = "Hello There";
// const result = str.match(re);
// console.log(result);

// search() - Return index of the first match, if not found, returns -1

// const str = "Hello There";
// const result = str.search(re);
// console.log(result);

// replace() - Return new string with some or all matches of a pattern

// const str = "Hello There";
// const newStr = str.replace(re, "Hi");
// console.log(newStr);

// Metacharacter Symbols

let re;

// Literal Characters
re = /hello/;
re = /hello/i; // i = case insensitive

// Metacharacters symbol
re = /^h/i; // ^ =  Must start with
re = /world$/i; // str$ =  Must end with
re = /^hello$/i; // ^str$ =  Beigns and ends with
re = /^h.llo$/i; // Matches any ONE character
re = /h*llo/i; // Matches any character 0 or more times
re = /gre?a?y/i; // Optional character
re = /gre?a?y\?/i; // Escape characters

// Character Sets

// Brackets [] - Characters Sets
re = /gr[ae]y/i; // Must be an 'a' or 'e'
re = /[GF]ray/i; // Must be an 'G' or 'F'
re = /[^GF]ray/i; // Match anything except a G or F
re = /[A-Z]ray/; // Match any uppercase letter
re = /[a-z]ray/; // Match any lowercase letter
re = /[a-zA-Z]ray/; // Match any letter
re = /[0-9][0-9]ray/; // Match any digit

// Braces {} - Quantifiers
re = /Hel{2}o/i; // Must occur exactly {x} amount of times
re = /Hel{2,4}o/i; // Must occur exactly {x up to y} times
re = /Hel{2,}o/i; // Must occur at least {x} times

// Parentheses () - Grouping
re = /^([0-9]x){3}$/;

// ShortHand Character Classes
re = /\w/; // Word character - alphanumeric or _
re = /\w+/; // + = one or more
re = /\W/; // Non-Word character - alphanumeric or _
re = /\d/; // Match any digit
re = /\d+/; // Match any digit 0 or more times
re = /\D/; // Match any Non-digit
re = /\s/; // Match whitespace character
re = /\S/; // Match non-whitespace character
re = /Hell\b/i; // Word boundary

// Assertions (Conditionals)
re = /x(?=y)/; // Match x only if is followed by y
re = /x(?!y)/; // Match x only if NOT followed by y

// String to match
const str = "xy";

// Log results
const result = re.exec(str);
console.log(result);

function reTest(re, str) {
  if (re.test(str)) {
    console.log(`${str} matches ${re.source}`);
  } else {
    console.log(`${str} does NOT match ${re.source}`);
  }
}

reTest(re, str);
