const individualServicesService = require('./IndividualServicesService');
const requestHandler = require('./individualServices/RequestHandler');
const initConfig = require('../initConfig');

jest.mock('./individualServices/RequestHandler'); // Mocking des requestHandlers


function getMockResultData(data)
{
  return {
    code: 200,
    message: JSON.stringify(data),
    headers: {},
    operationName: 'operationName'
  };
}


describe('provideListOfConnectedDevices', () => {
    const mockRequestUrl = 'http://localhost:4019/v1/provide-list-of-connected-devices';

    it('should call postRequestDataFromMWDI with correct arguments and return the result', async () => {
        const expectedResult = {
            "mount-name-list": [
                "305251234",
                "105258888"
            ]};

        // Setzt den Rückgabewert des Mocks
        requestHandler.postRequestDataFromMWDI.mockResolvedValue(getMockResultData(expectedResult));

        // Führt die Funktion aus
        const result = await individualServicesService.provideListOfConnectedDevices(mockRequestUrl);

        // Überprüft, ob die Funktion mit den richtigen Parametern aufgerufen wurde
        expect(requestHandler.postRequestDataFromMWDI).toHaveBeenCalledWith(
          mockRequestUrl,
          'PromptForProvidingListOfConnectedDeviceCausesReadingMwdiDeviceList',
          {}
        );

        // Überprüft, ob das Ergebnis korrekt ist
        expect(result.message).toBe(JSON.stringify(expectedResult));
    });

    it('should handle errors and throw an exception if postRequestDataFromMWDI fails', async () => {
        const mockError = new Error('Request failed');

        // Mockt einen Fehlerfall
        requestHandler.postRequestDataFromMWDI.mockRejectedValue(mockError);

        // Überprüft, ob die Funktion den Fehler korrekt wirft
        await expect(individualServicesService.provideListOfConnectedDevices(mockRequestUrl)).rejects.toThrow('Request failed');
    });
});
