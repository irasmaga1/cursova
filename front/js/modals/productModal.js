import { getCategories } from "../config.js";
import { getAndShowAllProducts, sendProductData } from "../productAPI/products.js";
import { CustomModal } from "./main.js";

//
// ********* Модальне вікно для створення та редагування продукту ************
// 
const productModalTitle = `Create product`;
const productModalContent = `<form name="productForm" enctype="multipart/form-data">
    <input type="hidden" name="productId" id="productId">
    <input type="hidden" name="oldCloudinaryPublicId" id="oldCloudinaryPublicId">
    <input type="hidden" name="oldImagePath" id="oldImagePath">
    <table class="form-table">
        <tr>
            <td class="form-label"><label for="productCategory">Category:</label> </td>
            <td class="form-input">
                <select name="productCategory" id="productCategory" class="form-select" required>
                </select>
            </td>
        </tr>
        <tr>
            <td class="form-label"><label for="productName">Name:</label> </td>
            <td class="form-input"><input type="text" name="productName" id="productName" class="form-control" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="productWeight">Weight:</label> </td>
            <td class="form-input"><input type="number" name="productWeight" id="productWeight" class="form-control" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="productFood">Type od food:</label> </td>
            <td class="form-input">
                <select name="productFood" id="productFood" class="form-select" required>
                    <option>Dry food</option>
                    <option>Wet food</option>
                    <option>Food for bird</option>
                    <option>Food for hamster</option>
                    <option>Food for rabbit</option>
                    <option>Food spider</option>
                </select>
            </td>
        </tr>
        <tr>
        </tr>
        <tr>
            <td class="form-label"><label for="productImage">Image:</label> </td>
            <td class="form-input"><input type="file" name="productImage" id="productImage" class="form-control" onchange="document.getElementById('formImage').src = window.URL.createObjectURL(this.files[0])" ></td>
        </tr>
        <tr>
            <td class="form-label"><label for="productPrice">Price, &#x20b4:</label> </td>
            <td class="form-input"><input type="number" name="productPrice" id="productPrice" class="form-control" required></td>
        </tr>
    </table>
    <div class="modal-form-footer">
        <input type="submit" class="btn btn-success" id="submitProductBtn" value="Create">
        <input type="reset" class="btn btn-danger" id="cancelProductBtn" data-close="true" value="Cancel">
    </div>
    </form>`;
const productModalFooter =``;
export const productModal = new CustomModal('prd', productModalTitle, productModalContent, productModalFooter);
productModal.create();

export const convertModalToCreate = () => {
    document.getElementById('title-prd').innerText = "Create product";
    document.getElementById('submitProductBtn').value = "Create" 
}



//Функції для зміни режиму вікна Створення/Редагування

export const convertModalToEdit = () => {
    document.getElementById('title-prd').innerText = "Edit product";
    document.getElementById('submitProductBtn').value = "Confirm" 
}



export const openProductModalWithCreate = () => {
    convertModalToCreate();
    renderProductCategoriesOptions();
    productModal.open();
}

// Обробник відправки форми
document.forms["productForm"].addEventListener ('submit', (e) => {
    e.preventDefault();
    productModal.close();
    convertModalToCreate();
    sendProductData()
    .then( () => {getAndShowAllProducts()} )
    .catch (err => console.error(err)) ;    
})


// Випадаючий список для категорій товарів в модалці продуктів
// тобто дані блоки перемальовуються при створенні нової категорії

export const renderProductCategoriesOptions = () =>  {
    
    // Вибираємо select модалкки продуктів i очищуємо його
    const producCategory = document.getElementById('productCategory');
    // console.log('producCategory', producCategory);
    producCategory.innerHTML = ``;
    // Додаємо в нього опцію по замовчуванню 
    // <option disabled selected value> -- select a category -- </option>
    const defaultProductCategoryOption = document.createElement('option');
    defaultProductCategoryOption.setAttribute("disabled", "");
    defaultProductCategoryOption.setAttribute("selected", "");
    defaultProductCategoryOption.setAttribute("value", "");
    defaultProductCategoryOption.innerText = ` -- select a category -- `;
    producCategory.appendChild(defaultProductCategoryOption);
    
    // Вибираємо категорії товарів з LS
    const categoryArr = getCategories();
    
    categoryArr.forEach(category => {
        const categoryOption = document.createElement('option');
        categoryOption.value = category._id;
        categoryOption.innerText = `${category.name}`;
        producCategory.appendChild(categoryOption);
    });
}