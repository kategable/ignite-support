import { ChangeDetectionStrategy, Component, Input, QueryList, ViewChildren } from "@angular/core";
import { IgxExpansionPanelComponent } from '@infragistics/igniteui-angular';
import { Observable } from 'rxjs';

import { PeerGroup } from 'src/app/common/types/peer-group.type';
@Component({
    selector: "app-list",
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListComponent {
    isLanding: Boolean = true;
    hasPeerGroups: Boolean = false;
    isCreatingPeerGroup: Boolean = false;
    @ViewChildren(IgxExpansionPanelComponent) public accordion: QueryList<IgxExpansionPanelComponent>;
    @Input() list: PeerGroup[];

    constructor() {

    }
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
    info(event) {
        event.stopPropagation();
        throw ("not implemented")

    }
    duplicate(event) {
        event.stopPropagation();
        throw ("not implemented")
    }

    trackByFn(index: number, item: PeerGroup){
        return item.peerGroupId;
    }
}
