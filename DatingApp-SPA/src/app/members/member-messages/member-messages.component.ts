import { Message } from './../../_models/message';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid; // + any = number
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
        .pipe(
          tap(messages => {
            for(let i = 0; i < messages.length; i++)
            {              
              if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
                this.userService.markMessageAsRead(currentUserId, messages[i].id);
              }
            }
          })
        )
        .subscribe(mess => {
          this.messages = mess;
        }, error => {
          this.alertify.errorMsg(error);
        })
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
        .subscribe((m: Message) => {
            this.messages.unshift(m);
            this.newMessage.content = '';
        }, error => {
          this.alertify.errorMsg(error);
        });
  }

}
