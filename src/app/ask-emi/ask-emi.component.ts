import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ask-emi',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ask-emi.component.html',
  styleUrls: ['./ask-emi.component.scss']
})
export class AskEmiComponent {

  @ViewChild('chatBody')
  chatBody!: ElementRef;

  question = '';

  suggestions = [
    'What should I focus on today?',
    'Find the latest brand guidelines',
    'Help me prepare for my 1:1',
    "I'm feeling overwhelmed"
  ];

  messages = [
    {
      type: 'bot',
      text: "Good morning, Sarah. I've kept your first hour clear. What would help you feel prepared today?"
    }
  ];

  sendMessage(): void {
    if (!this.question.trim()) {
      return;
    }

    this.messages.push({
      type: 'user',
      text: this.question
    });

    const question = this.question;
    this.question = '';

    setTimeout(() => {
      this.messages.push({
        type: 'bot',
        text: `This is a demo response for "${question}".`
      });

      setTimeout(() => {
        this.chatBody.nativeElement.scrollTop =
          this.chatBody.nativeElement.scrollHeight;
      });
    }, 800);
  }
}