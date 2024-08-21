import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useFieldArray, useForm } from 'vee-validate';
import { createUpdateProductAction, getProductById } from '@/modules/products/actions';
import { useMutation, useQuery } from '@tanstack/vue-query';
import * as yup from 'yup';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTexarea from '@/modules/common/components/CustomTexarea.vue';
import { useToast } from 'vue-toastification';

const validationSchema = yup.object({
  title: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});

export default defineComponent({
  components: { CustomInput, CustomTexarea },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const {
      isPending: isPendingUpdate,
      isSuccess: isSuccessUpdate,
      data: updatedProduct,
      mutate,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    });
    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
    });
    const toast = useToast();

    const { fields: images } = useFieldArray<string>('images');
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

    const imageFiles = ref<File[]>([]);
    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);
      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };
    const onSubmit = handleSubmit((values) => {
      const formValues = {
        ...values,
        images: [...values.images, ...imageFiles.value],
      };
      mutate(formValues);
    });

    const hasSize = (size: string) => sizes.value.map((s) => s.value).includes(size);

    const onFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const fileList = target.files;

      if (!fileList) return;
      if (fileList.length === 0) return;

      for (const imageFile of fileList) {
        imageFiles.value.push(imageFile);
      }
    };
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products/');
        return;
      }
    });
    watch(
      product,
      () => {
        if (!product) return;
        resetForm({ values: product.value });
      },
      {
        deep: true,
        immediate: true,
      },
    );

    watch(isSuccessUpdate, (value) => {
      if (!value) return;
      toast.success('Product updated successfully');
      router.replace(`/admin/products/${updatedProduct.value.id}`);
      resetForm({
        values: updatedProduct.value,
      });
      imageFiles.value = [];
    });

    watch(
      () => props.productId,
      () => {
        refetch();
      },
      {
        deep: true,
        immediate: true,
      },
    );
    return {
      //props
      product,
      values,
      errors,
      meta,
      //fields
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      images,
      sizes,
      imageFiles,
      //getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      //actions
      onSubmit,
      toggleSize,
      hasSize,
      isPendingUpdate,
      onFileChange,

      temporalImageUrl: (imageFile: File) => {
        return URL.createObjectURL(imageFile);
      },
    };
  },
});
