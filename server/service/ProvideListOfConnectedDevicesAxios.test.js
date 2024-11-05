const individualServicesService = require('./IndividualServicesService');
const axios = require('axios');
const initConfig = require('../initConfig');

jest.mock('axios');
jest.mock('onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService');


describe('provideListOfConnectedDevices', () => {
    const mockRequestUrl = 'http://localhost:4019/v1/provide-list-of-connected-devices';

    it('should call axios.post with correct arguments and return the result', async () => {
        const expectedResult = {
            "mount-name-list": [
                "305251234",
                "105258888"
            ]};

        const axiosMockResponse =
          {
              status: 200,
              data: expectedResult,
              headers: {}
          };

        // Setzt den Rückgabewert des Mocks
        axios.post.mockResolvedValue(axiosMockResponse);

        // Führt die Funktion aus
        const result = await individualServicesService.provideListOfConnectedDevices(mockRequestUrl);

        // Überprüft, ob die Funktion mit den richtigen Parametern aufgerufen wurde
        expect(axios.post).toHaveBeenCalledWith(
          expect.stringMatching(/.*\/v1\/provide-list-of-connected-devices/),
          {},
          expect.any(Object)
        );

        // Überprüft, ob das Ergebnis korrekt ist
        expect(result.message).toBe(expectedResult);
    });
});
