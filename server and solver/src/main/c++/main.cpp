#include <iostream>
#include <vector>
#include <set>
#include <fstream>

using namespace std;

typedef vector<vector<int>> Sudoku;

bool check_sudoku(const Sudoku& sud);

bool block = 0;

set<int> lne(Sudoku& sud, int x, int y) {
    set<int> ans;
    for(int j = 0; j < 9; j++) ans.insert(j + 1);
    for(int j = 0; j < 9; j++) {
        ans.erase(sud[x][j]);
        ans.erase(sud[j][y]);
    }
    int k1 = x / 3;
    int k2 = y / 3;
    for(int i = k1 * 3; i < k1 * 3 + 3; i++) {
        for(int j = k2 * 3; j < k2 * 3 + 3; j++) {
            ans.erase(sud[i][j]);
        }
    }
    return ans;
}

void sudoku_solve(Sudoku& sud, int x, int y) {
    if(sud[x][y] != -1) {
        if(x != 8 && y != 8) sudoku_solve(sud, x, y + 1);
        else if(x != 8) sudoku_solve(sud, x + 1, 0);
        else if(y != 8) sudoku_solve(sud, x, y + 1);
    } else {
        for(auto i : lne(sud, x, y)) {
            if(!block) sud[x][y] = i;
            if(block) return;
            if(x != 8 && y != 8) sudoku_solve(sud, x, y + 1);
            else if(x != 8) sudoku_solve(sud, x + 1, 0);
            else if(y != 8) sudoku_solve(sud, x, y + 1);
            if(block) return;
            if(check_sudoku(sud)) {
                block = true;
                cout << "YEAH!" << endl;
                return;
            }
        }
        if(!block) sud[x][y] = -1;
    }
}

bool check_sudoku(const Sudoku& sud) {
    vector<set<int>> st_stol(9);
    vector<set<int>> st_blok(9);
    for(int i = 0; i < 9; i++) {
        set<int> st_line;
        for(int j = 0; j < 9; j++) {
            if(sud[i][j] == -1) return false;
            else {
                st_line.insert(sud[i][j]);
                st_stol[j].insert(sud[i][j]);
                if(i == 8) {
                    if(st_stol[j].size() != 9) {
                        return false;
                    }
                }
            }
        }
        if(st_line.size() != 9) {
            return false;
        }
    }
    int count = -1;
    for(int k1 = 0; k1 < 9; k1 += 3) {
        for(int k2 = 0; k2 < 9; k2 += 3) {
            count++;
            for(int i = k1; i < k1 + 3; i++) {
                for(int j = k2; j < k2 + 3; j++) {
                    st_blok[count].insert(sud[i][j]);
                }
            }
        }
    }
    for(int i = 0; i < 9; i++) {
        if(st_blok[i].size() != 9) return false;
    }
    return true;
}

int main() {
    Sudoku sudoku;
    for(int i = 0; i < 9; i++) {
        sudoku.push_back(vector<int>(0));
        for(int j = 0; j < 9; j++) {
            int tmp;
            cin >> tmp;
            sudoku[i].push_back(tmp);
        }
    }
    for(const auto& t : sudoku) {
        for(auto tt : t) {
            cout << tt << ' ';
        }
        cout << endl;
    }
    cout << endl << endl;
    sudoku_solve(sudoku, 0, 0);
    for(const auto& t : sudoku) {
        for(auto tt : t) {
            cout << tt << ' ';
        }
        cout << endl;
    }
    if(check_sudoku(sudoku)) {
        cout << "Solved!" << endl;
        for(const auto& t : sudoku) {
            for(auto tt : t) {
                cout << tt << ' ';
            }
            cout << endl;
        }
    } else {
        cout << "ERROR!" << endl;
    }
    return 0;
}