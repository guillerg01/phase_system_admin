import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Reservation } from "@/interfaces/interfaces";
import FormInput from "@/components/fields/FormInput";
import ReservationApiService from "@/services/ReservationApiServices";
import { formatCurrency } from "@/utils/formatters";

type ReservationFormData = {
  name: string;
  lastName: string;
  ci: string;
  hoursToUse: number;
  price: number;
};

// Validation schema
const validationSchema: yup.ObjectSchema<ReservationFormData> = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    lastName: yup.string().required("Last name is required"),
    ci: yup.string().required("ID number is required"),
    hoursToUse: yup
      .number()
      .required("Hours to use is required")
      .min(1, "Must be at least 1 hour"),
    price: yup.number().required(),
  });

// Default values
const defaultValues: ReservationFormData = {
  name: "",
  lastName: "",
  ci: "",
  hoursToUse: 1,
  price: 0,
};

interface IProps {
  setOpen?: (value: boolean) => void;
  item?: Reservation;
  onSuccess?: () => void;
}

const FormReservation = ({ setOpen, item, onSuccess }: IProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    defaultValues: item
      ? {
          name: item.name,
          lastName: item.lastName,
          ci: item.ci,
          hoursToUse: item.hoursToUse,
          price: item.price,
        }
      : defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // Watch hoursToUse to calculate price in real-time
  const hoursToUse = watch("hoursToUse");

  // Calculate price when hours change (this is a simplified calculation, adjust according to your business logic)
  const calculatePrice = (hours: number) => {
    // Example: 10 EUR per hour
    const pricePerHour = 10;
    return hours * pricePerHour;
  };

  // Update price when hours change
  useEffect(() => {
    const price = calculatePrice(hoursToUse || 0);
    setCalculatedPrice(price);
    setValue("price", price);
  }, [hoursToUse, setValue]);

  const onSubmit = handleSubmit(async (data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      const reservationData = {
        ...data,
        status: "PENDING" as const,
      };

      if (item?.id) {
        await ReservationApiService.update(item.id, {
          ...reservationData,
          id: item.id,
        });
      } else {
        await ReservationApiService.create(reservationData as Reservation);
      }

      onSuccess?.();
      setOpen?.(false);
    } catch (error) {
      console.error("Error saving reservation:", error);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="p-4 space-y-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          errors={errors}
          required
          label="Name"
          type="text"
          name="name"
          control={control}
          minLabel="min-w-36"
          action="create"
          placeholder="Enter name"
        />

        <FormInput
          errors={errors}
          required
          label="Last Name"
          type="text"
          name="lastName"
          control={control}
          minLabel="min-w-36"
          action="create"
          placeholder="Enter last name"
        />

        <FormInput
          errors={errors}
          required
          label="ID Number"
          type="text"
          name="ci"
          control={control}
          minLabel="min-w-36"
          action="create"
          placeholder="Enter ID number"
        />

        <FormInput
          errors={errors}
          required
          label="Hours to Use"
          type="number"
          name="hoursToUse"
          control={control}
          minLabel="min-w-36"
          action="create"
          placeholder="Enter hours"
        />
      </div>

      <div className="mt-4 p-4 bg-[#00000040] rounded-lg">
        <p className="text-gray-400">Estimated Price</p>
        <p className="text-2xl font-bold">{formatCurrency(calculatedPrice)}</p>
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
          {isSubmitting ? "Saving..." : item ? "Update" : "Create Reservation"}
        </button>
      </div>
    </form>
  );
};

export default FormReservation;
