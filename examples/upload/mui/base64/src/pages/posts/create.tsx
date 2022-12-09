import { useState } from "react";
import {
    Create,
    Box,
    TextField,
    Autocomplete,
    useAutocomplete,
    Input,
    Stack,
    Typography,
} from "@pankod/refine-mui";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { ICategory } from "interfaces";

export const PostCreate: React.FC = () => {
    const [isUploadLoading, setIsUploadLoading] = useState(false);

    const {
        saveButtonProps,
        register,
        control,
        formState: { errors },
        setValue,
        setError,
        watch,
    } = useForm();

    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
    });

    const imageInput = watch("images");

    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const onChangeHandler = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        try {
            setIsUploadLoading(true);

            const target = event.target;
            const file: File = (target.files as FileList)[0];

            const base64 = await convertBase64(file);

            setValue("images", base64, { shouldValidate: true });

            setIsUploadLoading(false);
        } catch (error) {
            setError("images", { message: "Upload failed. Please try again." });
            setIsUploadLoading(false);
        }
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
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
                            src={imageInput}
                            alt="Post image"
                        />
                    )}
                </Stack>
            </Box>
        </Create>
    );
};
