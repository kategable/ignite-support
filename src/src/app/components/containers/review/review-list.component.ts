import { ChangeDetectionStrategy, Component, Input, QueryList, ViewChildren } from "@angular/core";
import { IgxExpansionPanelComponent } from '@infragistics/igniteui-angular';
import { Observable } from 'rxjs';
import { PeerGroup } from 'src/app/common/types/peer-group.type';

@Component({
  selector: "app-review-list",
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReviewListComponent {

  @ViewChildren(IgxExpansionPanelComponent) public accordion: QueryList<IgxExpansionPanelComponent>;
  @Input() reviews: PeerGroup[];

  handleCollapsed(e) {
    e.cancelBubble = true;

  }
  handleExpanded(e) {

  }

  onInteraction(event) {
    const expandedPanels = this.accordion.filter((panel) => !panel.collapsed);
    expandedPanels.forEach((expandedPanel) => {
      if (expandedPanel !== event.event.currentTarget) {
        expandedPanel.toggle();
      }
    });
  }

  trackByFn(index: number, item: PeerGroup) {
    return item.peerGroupId;
  }

}
