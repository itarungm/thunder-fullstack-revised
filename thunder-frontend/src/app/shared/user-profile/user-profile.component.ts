import { Component, OnInit } from '@angular/core';
import { RandomQuoteModel } from 'src/app/models/random-quotes.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'thunder-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  name: string;
  quote: RandomQuoteModel;
  constructor(private commonService: CommonService) {
    this.name = this.commonService.getUserName();
    this.callRandomQuote()
   }

   callRandomQuote(){
     this.commonService.randomQuote().subscribe((res)=>{
       this.quote = res;
     });
   }

  ngOnInit(): void {

  }

}
