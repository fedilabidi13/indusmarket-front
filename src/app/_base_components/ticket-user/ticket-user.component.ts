import {ChangeDetectorRef, Component} from '@angular/core';
import {Claims} from "../../models/Claims";
import {User} from "../../models/user";
import {ClaimService} from "../../_services/claim.service";
import {TicketService} from "../../_services/ticket.service";
import {Ticket} from "../../models/Ticket";

@Component({
  selector: 'app-ticket-user',
  templateUrl: './ticket-user.component.html',
  styleUrls: ['./ticket-user.component.scss']
})
export class TicketUserComponent {
  public tickets:Ticket[]=[];
  pageSize = 3; // Number of items to display per page
  currentPage = 1; // Current page number
  user!:User;
  constructor(private ticketService : TicketService,private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.ticketService.GetUserTickets()
      .subscribe(res=>{
        this.tickets = res;
        console.log(this.tickets)
      })

  }
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  showTicket(ticket: Ticket) {
    const url = 'http://localhost:4200/assets/img/'+ticket.reference+'.pdf';
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    } else {
      console.error('Failed to open window');
    }
  }
  onDeleteClick(id : number){
    this.ticketService.deleteTicket(id).subscribe(
      () => console.log(`ticket ${id} deleted successfully`),
      error => console.error('Error deleting event:', error)
    );
  }


}
