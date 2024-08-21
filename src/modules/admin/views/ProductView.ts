import { defineComponent, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useFieldArray, useForm } from 'vee-validate';
import { getProductById } from '@/modules/products/actions';
import { useQuery } from '@tanstack/vue-query';
import * as yup from 'yup';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTexarea from '@/modules/common/components/CustomTexarea.vue';

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
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
    });

    const { fields: images } = useFieldArray<string>('images');
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');
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
    const onSubmit = handleSubmit((value) => {
      console.log(value);
    });

    const hasSize = (size: string) => sizes.value.map((s) => s.value).includes(size);

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
      //getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      //actions
      onSubmit,
      toggleSize,
      hasSize,
    };
  },
});
