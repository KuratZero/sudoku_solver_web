package com.example.sudoku_solver;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.List;

@RestController
@CrossOrigin
public class MainSudoku {
    @GetMapping("/")
    public String sudoku(@RequestParam List<Integer> arr) {
        try {
            Thread.sleep(200);
            Process process = Runtime.getRuntime().exec("/home/artemij/IdeaProjects/sudoku_solver/src/main/c++/a.out");
            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    process.outputWriter().write(arr.get(i * 9 + j) + " ");
                }
                process.outputWriter().newLine();
            }
            process.outputWriter().close();
            Thread.sleep(1000);
            for (String tmp = process.inputReader().readLine(); tmp != null; tmp = process.inputReader().readLine()) {
                if (tmp.equals("Solved!") || tmp.equals("ERROR!")) {
                    StringBuilder ans = new StringBuilder();
                    ans.append(tmp).append("<br>");
                    for (int i = 0; i < 9; i++) {
                        String tmp1 = process.inputReader().readLine();
                        ans.append(tmp1).append("<br>");
                    }
                    return ans.toString();
                }
            }
        } catch (IOException e) {
            return "Программа решения судоку сломалась((";
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return "Что-то пошло не так?";
    }
}
