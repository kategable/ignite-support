import { Company } from './company.type';

export interface PeerGroup {
	peerGroupId: number;
	peerGroupName: string;
	peerGroupDisplayName: string;
	surveyCode: string;
	surveyName: string;
	countryCode: string;
	countryName: string;
	effectiveDate: string;
	createdBySmsCompId: number;
	statusId: number;
	statusName: string;
	peerGroupInfo: string;
	createdBy: string;
	createdOn: string;
	modifiedBy: string;
	modifiedOn: string;
	validationRunBy: string;
	validationRunDate: string;
	peerGroupValidationId: number;
	validationMessage: string;
	canRefreshFlag: number;
	refreshedBy: string;
	refreshedDate: string;
	expiredDate: string;
	deletedFlag: boolean;
	createdByName: string;
	companies: Company[];
	disabledLook: boolean;	
}
