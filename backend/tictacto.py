import math
import copy,sys,json

def TerminalTest(state):
    for i in range(3):
        for j in range(3):
            if state[i][j] == '':
                return False
    return True

def Utility(state):
    # row test
    for i in range(3):
        if state[i][0] == state[i][1] == state[i][2]:
            if state[i][0] == 'X':
                return 1
            elif state[i][0] == 'O':
                return -1
    # column Test
    for i in range(3):
        if state[0][i] == state[1][i] == state[2][i]:
            if state[0][i] == 'X':
                return 1
            elif state[0][i] == 'O':
                return -1
    # diagonal Test
    if (state[0][0] == state[1][1] == state[2][2] == 'X' or state[0][2] == state[1][1] == state[2][0] == 'X'):
        return 1
    elif (state[0][0] == state[1][1] == state[2][2] == 'O' or state[0][2] == state[1][1] == state[2][0] == 'O'):
        return -1
    return 0

def Successors(player, state):
    s = []
    if player == 'X':
        for i in range(3):
            for j in range(3):
                if state[i][j] == '':
                    new_state = copy.deepcopy(state)
                    new_state[i][j] = 'X'
                    s.append(new_state)
    else:
        for i in range(3):
            for j in range(3):
                if state[i][j] == '':
                    new_state = copy.deepcopy(state)
                    new_state[i][j] = 'O'
                    s.append(new_state)
    return s

def Minimax_Decision(state):
    v, a = Max_Value(state)
    return v, a

def Max_Value(state):
    if TerminalTest(state):
        return Utility(state), None
    v = -math.inf
    a = None
    for s in Successors('X', state):
        k, _ = Min_Value(s)
        if k > v:
            v = k
            a = s
    return v, a

def Min_Value(state):
    if TerminalTest(state):
        return Utility(state), None
    v = math.inf
    for s in Successors('O', state):
        k, _ = Max_Value(s)
        if k < v:
            v = k
    return v, None

def checkWin(state):
    for i in range(3):
        if state[i][0] == state[i][1] == state[i][2]:
            if state[i][0] == 'X':
                return "Computer Won"
            elif state[i][0] == 'O':
                return "User Won"
    # column Test
    for i in range(3):
        if state[0][i] == state[1][i] == state[2][i]:
            if state[0][i] == 'X':
                return "Computer Won"
            elif state[0][i] == 'O':
                return "User Won"
    # diagonal Test
    if (state[0][0] == state[1][1] == state[2][2] == 'X' or state[0][2] == state[1][1] == state[2][0] == 'X'):
        return "Computer Won"
    elif (state[0][0] == state[1][1] == state[2][2] == 'O' or state[0][2] == state[1][1] == state[2][0] == 'O'):
        return "User Won"
    return 0

def gameOver(state):
    for i in range(3):
        for j in range(3):
            if state[i][j] == '':
                return 0
    return 1

#play game

def playgame():
    global ply
   
    if checkWin(ply):
             print(checkWin(ply))
             print(ply)
             return
        
    if gameOver(ply):
            print("Draw")
            print(ply)
            return
    
    _, ply = Minimax_Decision(ply)
   
    if checkWin(ply):
             print(checkWin(ply))
    elif gameOver(ply):
            print("Draw")
         
    print(ply)
    return
    
        

x=int(sys.argv[1])
y=int(sys.argv[2])
ply=json.loads(sys.argv[3])
flag=int(sys.argv[4])
if flag==0:
    ply[x][y] = 'O'

playgame()
    
