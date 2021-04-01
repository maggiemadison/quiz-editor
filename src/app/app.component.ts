import {
  Component
  , OnInit
} from '@angular/core';

import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private quizSvc: QuizService
  ) { }

  quizzes = [];

  ngOnInit() {
    this.quizSvc
      .loadQuizzes()
      .subscribe(

        // Lambda with the data
        (data) => {
          console.log(data);
          this.quizzes = data;
        }

        // Lambda with the errors, if errors exist
        , (err) => console.error(err)

      )
      ;

    console.log(this.quizzes);
  }

  title = 'quiz-editor';

  selectedQuiz = undefined;

  selectQuiz(q) {
    this.selectedQuiz = q;
  }

  addNewQuiz() {

    const newQuiz = {
      name: "Untitled Quiz"
      , questions: []
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.selectQuiz(newQuiz);
  }

  deleteQuestion(questionToDelete) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x != questionToDelete);
  }

  addNewQuestion() {
    const newQuestion = {
      name: "Untitled Question"
    };

    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions,
      newQuestion
    ];
  };
};
