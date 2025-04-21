import useGetTariffHistory from "@/hooks/useGetTariffHistory";
import { ElectricCarChargingTariff } from "@/interfaces/interfaces";
import { formatCurrency } from "../../../../utils/formatters";

// Component to display a single tariff record
const TariffRecord = ({
  tariff,
  isLatest,
}: {
  tariff: ElectricCarChargingTariff;
  isLatest: boolean;
}) => (
  <div
    className={`p-4 rounded-lg mb-4 ${
      isLatest ? "bg-[#00000070]" : "bg-[#00000040]"
    }`}
  >
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-gray-400">Price Per Hour</p>
        <p className="text-white font-semibold">
          {formatCurrency(tariff.pricePerHour)}
        </p>
      </div>
      <div>
        <p className="text-gray-400">Fast Charge Price</p>
        <p className="text-white font-semibold">
          {formatCurrency(tariff.priceFastCharge)}
        </p>
      </div>
      <div>
        <p className="text-gray-400">High Concurrency Price</p>
        <p className="text-white font-semibold">
          {formatCurrency(tariff.priceHighConcurrency)}
        </p>
      </div>
      <div>
        <p className="text-gray-400">Min Charging Time</p>
        <p className="text-white font-semibold">{tariff.minChargingTime} min</p>
      </div>
    </div>
    {isLatest && (
      <div className="mt-2">
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
          Current Version
        </span>
      </div>
    )}
  </div>
);

const HistoryTariff = ({ id }: { id: string }) => {
  //   const { data: response, isLoading, error } = useGetTariffHistory(id);
  const isLoading = false;
  const error = false;
  const response = {
    data: [
      {
        id: "1",
        pricePerHour: 10,
        priceFastCharge: 10,
        priceHighConcurrency: 10,
        minChargingTime: 10,
      },
      {
        id: "2",
        pricePerHour: 10,
        priceFastCharge: 10,
        priceHighConcurrency: 10,
        minChargingTime: 10,
      },
      {
        id: "3",
        pricePerHour: 10,
        priceFastCharge: 10,
        priceHighConcurrency: 10,
        minChargingTime: 10,
      },
    ],
  };
  const historyData = response?.data as ElectricCarChargingTariff[] | undefined;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error loading tariff history
      </div>
    );
  }

  if (!historyData || historyData.length === 0) {
    return (
      <div className="text-gray-400 p-4 text-center">
        No history available for this tariff
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl text-white font-semibold mb-6">Tariff History</h2>
      <div className="space-y-6 overflow-y-auto max-h-[500px]">
        {historyData.map((tariff: ElectricCarChargingTariff, index: number) => (
          <TariffRecord
            key={`${tariff.id}-${index}`}
            tariff={tariff}
            isLatest={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryTariff;
