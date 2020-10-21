import { Company, PeerGroup, ReturnListViewModel } from 'src/app/common/types';
var faker = require('faker');
export function mockPeerGroupsFactory(): PeerGroup[] {
	let i = 0;
	let list = Array(100)
		.fill(0)
		.map(() => {
			var rnd = faker.helpers.createCard();
			i++;
			return {
				peerGroupId: i,
				peerGroupDisplayName: rnd.name.substring(0, 50),
				effectiveDate: rnd.accountHistory[0].date.toLocaleDateString(
					'en-US'
				),
				surveyCode: rnd.address.state.substring(1, 4).toUpperCase(),
				companies: rnd.posts,
				canRefreshFlag: rnd.accountHistory[0].account % 2,
				countryCode: rnd.address.country,
				countryName: rnd.address.country.substring(0, 5),
				statusId: rnd.accountHistory[0].account % 2,
				statusName: rnd.name, 
				peerGroupName: rnd.name.substring(0, 50),	  
				surveyName: 'Survey Name',  
				createdBySmsCompId: 12,				 
				peerGroupInfo: 'info',
				createdBy: 'abc',
				createdOn: '12-2-2020',
				modifiedBy: 'abc',
				modifiedOn: '12-2-2020',
				validationRunBy: 'abc',
				validationRunDate: '12-2-2020',
				peerGroupValidationId: 1,
				validationMessage: 'abc message',			 
				refreshedBy: 'anv',
				refreshedDate:  '12-2-2020',
				expiredDate: '12-2-2020',
				deletedFlag: false,
			} as PeerGroup;
		});

 
	return list;
}
