const question = [
    {
        title: "1926. Nearest Exit from Entrance in Maze",
        description: (
            <span>
                You are given an <code>m x n</code> matrix <code>maze</code> (0-indexed) with empty cells (represented as <code>.</code>) and walls (represented as <code>+</code>). You are also given the <b>entrance</b> of the maze, where <code>entrance = [entrancerow, entrancecol]</code> denotes the row and column of the cell you are initially standing at.
                <br /><br />
                In one step, you can move one cell <b>up</b>, <b>down</b>, <b>left</b>, or <b>right</b>. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest <b>exit</b> from the entrance. An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit.
                <br /><br />
                Return the number of steps in the shortest path from the entrance to the nearest exit, or <code>-1</code> if no such path exists.
            </span>
        ),
        difficulty: "medium",
        input: 'maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]',
        output: 1
    }
];

export default question;