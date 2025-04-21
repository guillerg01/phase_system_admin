import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ElectricCarChargingTariff } from "@/interfaces/interfaces";
import FormInput from "@/components/fields/FormInput";
import TariffApiService from "@/services/TariffApiServices";

// Validation schema
const validationSchema = yup.object().shape({
  pricePerHour: yup
    .number()
    .required("Price per hour is required")
    .min(0, "Price must be positive"),
  priceFastCharge: yup
    .number()
    .required("Fast charge price is required")
    .min(0, "Price must be positive"),
  priceHighConcurrency: yup
    .number()
    .required("High concurrency price is required")
    .min(0, "Price must be positive"),
  minChargingTime: yup
    .number()
    .required("Minimum charging time is required")
    .min(0, "Time must be positive"),
});

// Default values
const defaultValues = {
  pricePerHour: 0,
  priceFastCharge: 0,
  priceHighConcurrency: 0,
  minChargingTime: 0,
};

interface IProps {
  setOpen?: (value: boolean) => void;
  item?: ElectricCarChargingTariff;
  dataFormated?: ElectricCarChargingTariff[];
  setDataFormated?: (value: ElectricCarChargingTariff[]) => void;
}

const FormTariff = ({
  setOpen,
  item,
  dataFormated,
  setDataFormated,
}: IProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Omit<ElectricCarChargingTariff, "id">>({
    defaultValues: item
      ? {
          pricePerHour: item.pricePerHour || 0,
          priceFastCharge: item.priceFastCharge || 0,
          priceHighConcurrency: item.priceHighConcurrency || 0,
          minChargingTime: item.minChargingTime || 0,
        }
      : defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Omit<ElectricCarChargingTariff, "id">) => {
    setIsSubmitting(true);
    try {
      if (item?.id) {
        // await TariffApiService.update(item.id, { ...data, id: item.id });
        setDataFormated?.(
          dataFormated?.map((tariff) =>
            tariff.id === item.id ? { ...tariff, ...data } : tariff
          ) || []
        );
      } else {
        // await TariffApiService.create(data as ElectricCarChargingTariff);
        setDataFormated?.([...(dataFormated || []), { ...data, id: "new" }]);
      }
      setOpen?.(false);
    } catch (error) {
      console.error("Error saving tariff:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4 text-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          errors={errors}
          required
          label="Price Per Hour"
          type="number"
          name="pricePerHour"
          control={control}
          writeInput="price"
          minLabel="min-w-36"
          action="create"
          placeholder="0.00"
        />

        <FormInput
          errors={errors}
          required
          label="Fast Charge Price"
          type="number"
          name="priceFastCharge"
          control={control}
          writeInput="price"
          minLabel="min-w-36"
          action="create"
          placeholder="0.00"
        />

        <FormInput
          errors={errors}
          required
          label="High Concurrency Price"
          type="number"
          name="priceHighConcurrency"
          control={control}
          writeInput="price"
          minLabel="min-w-36"
          action="create"
          placeholder="0.00"
        />

        <FormInput
          errors={errors}
          required
          label="Minimum Charging Time"
          type="number"
          name="minChargingTime"
          control={control}
          writeInput="price"
          minLabel="min-w-36"
          action="create"
          placeholder="0.00"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-40 py-2 px-4 rounded-md ${
            !isSubmitting
              ? "bg-[#00000070] hover:bg-[#000000]/80 cursor-pointer"
              : "bg-gray-500 cursor-not-allowed"
          } text-white`}
        >
          {isSubmitting ? "Saving..." : item ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

FormTariff.displayName = "FormTariff";

export default FormTariff;
