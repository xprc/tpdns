import { useState } from "react";
import axios from "axios";
import {
    Edit,
    Box,
    TextField,
    Autocomplete,
    useAutocomplete,
    Input,
    Stack,
    Typography,
} from "@pankod/refine-mui";
import { LoadingButton } from "@mui/lab";
import { useApiUrl } from "@pankod/refine-core";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { ICategory } from "interfaces";

export const PostEdit: React.FC = () => {
    const [isUploadLoading, setIsUploadLoading] = useState(false);

    const apiUrl = useApiUrl();
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
        setValue,
        setError,
        watch,
    } = useForm();

    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    const imageInput = watch("images");

    const onChangeHandler = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        try {
            setIsUploadLoading(true);

            const formData = new FormData();

            const target = event.target;
            const file: File = (target.files as FileList)[0];

            formData.append("file", file);

            const res = await axios.post<{ url: string }>(
                `${apiUrl}/media/upload`,
                formData,
                {
                    withCredentials: false,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                },
            );

            const { name, size, type, lastModified } = file;

            const imagePaylod = [
                {
                    name,
                    size,
                    type,
                    lastModified,
                    url: res.data.url,
                },
            ];

            setValue("images", imagePaylod, { shouldValidate: true });

            setIsUploadLoading(false);
        } catch (error) {
            setError("images", { message: "Upload failed. Please try again." });
            setIsUploadLoading(false);
        }
    };

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    margin="normal"
                    fullWidth
                    label="Title"
                    name="title"
                    autoFocus
                />
                <Controller
                    control={control}
                    name="status"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            options={["published", "draft", "rejected"]}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Status"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.status}
                                    helperText={errors.status?.message}
                                    required
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...autocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    autocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.title ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option.id.toString() === value.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    required
                                />
                            )}
                        />
                    )}
                />
                <TextField
                    {...register("content", {
                        required: "This field is required",
                    })}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                    margin="normal"
                    label="Content"
                    multiline
                    rows={4}
                />
                <Stack
                    direction="row"
                    gap={4}
                    flexWrap="wrap"
                    sx={{ marginTop: "16px" }}
                >
                    <label htmlFor="images-input">
                        <Input
                            id="images-input"
                            type="file"
                            sx={{ display: "none" }}
                            onChange={onChangeHandler}
                        />
                        <input
                            id="file"
                            {...register("images", {
                                required: "This field is required",
                            })}
                            type="hidden"
                        />
                        <LoadingButton
                            loading={isUploadLoading}
                            loadingPosition="end"
                            endIcon={<FileUploadIcon />}
                            variant="contained"
                            component="span"
                        >
                            Upload
                        </LoadingButton>
                        <br />
                        {errors.images && (
                            <Typography variant="caption" color="#fa541c">
                                {errors.images?.message}
                            </Typography>
                        )}
                    </label>
                    {imageInput && (
                        <Box
                            component="img"
                            sx={{
                                maxWidth: 250,
                                maxHeight: 250,
                            }}
                            src={imageInput[0].url}
                            alt="Post image"
                        />
                    )}
                </Stack>
            </Box>
        </Edit>
    );
};
