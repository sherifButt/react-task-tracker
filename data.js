export const List = {
   list: [
      { id: 1, text: "first task" },
      { id: 2, text: "2nd task" },
      { id: 3, text: "3rd task" },
      { id: 4, text: "4th task" },
      { id: 5, text: "5th task" },
   ],
   getList: () => {
      return (
        localStorage.getItem( key: "theList")
     )
  },
  saveList: () => {},
};
