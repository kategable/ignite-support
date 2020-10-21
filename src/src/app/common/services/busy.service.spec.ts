
import { BusyService } from "./busy.service"

describe('Busy Service', () => {

    it('state.message should equal null to start', (done) => {
        let sut = new BusyService(); //arrange + act

        sut.busyState$.subscribe(state => {
            expect(state.message).toBe(null);// assert 
            done();
        });
    });
    it('state.message should be added when increment is called', (done) => {
        let sut = new BusyService(); //arrange
        let testMessage = "test message";

        sut.increment(testMessage); //act

        sut.busyState$.subscribe(state => {
            expect(state.message).toBe(testMessage);// assert     
            done();      
        });
    });
    it('state.busy should be true when increment is called', (done) => {
        let sut = new BusyService(); //arrange 

        sut.increment("testMessage"); //act

        sut.busyState$.subscribe(state => {
            expect(state.isBusy).toBe(true);// assert     
            done();      
        });
    });
    it('state should be null when decrement is called', (done) => {
        let sut = new BusyService(); //arrange 

        sut.decrement(); //act

        sut.busyState$.subscribe(state => {
            expect(state).toBe(null);// assert     
            done();      
        });
    });
})