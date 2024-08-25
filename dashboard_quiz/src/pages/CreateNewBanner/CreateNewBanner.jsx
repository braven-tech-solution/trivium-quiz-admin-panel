import React, { useEffect, useRef, useState } from "react";
import editSvg from "../../assets/icons/edit.svg";
import previewSvg from "../../assets/icons/preview.svg";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../components/Field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewFood } from "../../services/food/food";
import { createNewBanner } from "../../services/banner/banner";
import AddBannerModal from "../ManageAllBanner/AddBannerModal/AddBannerModal";

const CreateNewBanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [imgaa, setAAA] = useState("");

  const { auth } = useAuth();

  const fileUploaderRef = useRef();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const createNewBannerMutation = useMutation({
    mutationFn: createNewBanner,
  });

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    fileUploaderRef.current.files;

    const file = fileUploaderRef.current.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitForm = async (data) => {
    if (!auth?.email) {
      toast.warning("Please Login First");
      return;
    }

    if (!selectedFile) {
      setError("root.random", {
        type: "random",
        message: `Image is Required`,
      });
      return;
    }

    console.log({ data });

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    formData.append("bannerImage", selectedFile);

    foodCreateApiCall(formData);
  };

  const foodCreateApiCall = (formData) => {
    createNewBannerMutation.mutate(
      {
        formData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allBanner"]);
          toast.success("Banner Create successfully");
          navigate("/manage-all-banner");
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return <AddBannerModal />;
};

export default CreateNewBanner;
