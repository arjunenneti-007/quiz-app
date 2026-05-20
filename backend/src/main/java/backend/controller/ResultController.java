package backend.controller;

import backend.model.Result;
import backend.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:3000")
public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @PostMapping("/save")
    public Result saveResult(@RequestBody Result result) {
        return resultRepository.save(result);
    }

    @GetMapping("/{username}")
    public List<Result> getUserResults(@PathVariable String username) {
        return resultRepository.findByUsername(username);
    }
}