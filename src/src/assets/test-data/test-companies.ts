import { Company, ReturnListViewModel } from 'src/app/common/types';
var faker = require('faker');
export function mockCompaniesFactory(): Company[] { 
		let i = 0;
		let list = Array(20)
		  .fill(0)
		  .map(() => {
			var rnd = faker.helpers.createCard();
			i++;
			return {
			  id: rnd.accountHistory[0].account + i,
			  hqCode: rnd.name.substring(0, 1),
			  industryCode: "IND",
			  industryName: "Industry Name",
			  revenue: faker.random.number({
				'min': 10,
				'max': 5000000
			}),
			headcounts: faker.random.number({
				'min': 10,
				'max': 5000000
			}),
			orgTypeCode: "A",
			  clientId: rnd.accountHistory[0].account + i,
			  name: rnd.name.substring(0, 50),
			  recordId: i.toString(),
			  displayOrder: i,
			  selected: false,
			  ownership : "Ownership",
			  submitDate : new Date(),
			  submitDateFriendlyFormat : "<January> <1973>"

			};
		  });
		
		let res: ReturnListViewModel<Company> = {
		  total: list.length,
		  results: list,
		};
		return res.results;
	} 
