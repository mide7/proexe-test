import { dir, User } from "./interfaces";

export function getRandomString(length: number) {
  var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

export function sortTableByUsername(data: User[], direction: dir) {
  let sortedTable = [...data];
  if (direction === dir.ASC) {
    sortedTable.sort((a, b) => {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    });
  } else if (direction === dir.DESC) {
    sortedTable.sort((a, b) => {
      if (a.username < b.username) {
        return 1;
      }
      if (a.username > b.username) {
        return -1;
      }
      return 0;
    });
  } else {
    sortedTable.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  return sortedTable;
}
