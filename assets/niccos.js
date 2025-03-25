document.addEventListener("DOMContentLoaded", () => {
    var mobile_form_controls = document.querySelectorAll(".niccos-gift_products .mobile-niccos-form-control");
    var search_drawer = document.querySelector(".niccos-search-drawer");
    var search_drawer_close = document.querySelector(".niccos-search-drawer .search-action-bar .feather-x");
    var search_input = document.querySelector("#search_product_action");
    var product_titles = document.querySelectorAll(".search-product-item .search-product-item__info .search-product-item__title");
    var search_item_selectors = document.querySelectorAll(".search-product-item .search-product-item__selector");
    var products = document.querySelectorAll(".search-product-item");
    var minus_buttons = document.querySelectorAll(".search-product-item .quantity__remove");
    var plus_buttons = document.querySelectorAll(".search-product-item .quantity__add");
    var tab_items = document.querySelectorAll(".search-action__tab .tab-item");
    var choose_btn = document.querySelector(".niccos-search-footer .choose_btn");
    var selected_btn = document.querySelector(".niccos-search-footer .show_selector-items");
    var add_to_cart_btn = document.querySelector(".niccos-search-footer .add_to_cart_btn");
    var success_msg = document.querySelector(".niccos-search-footer .success-msg");
    if(tab_items) {
        tab_items.forEach(tab => {
            tab.addEventListener("click", () => {
                document.querySelector(".search-action__tab .tab-item.active").classList.remove("active");
                tab.classList.add("active");
                var filter_value = tab.dataset.tag;
                if(filter_value == "all"){
                    products.forEach(product => {
                        product.style.display = "flex";
                    })
                }else {
                    products.forEach(product => {
                        if(product.dataset.tags.includes(filter_value)) {
                            product.style.display = "flex";
                        }else {
                            product.style.display = "none";
                        }
                    })
                }
            })
        })
    }
    var selector_count = 0;
    if (mobile_form_controls) {
        mobile_form_controls.forEach(item => {
            item.addEventListener("click", () => {
                search_drawer.classList.add("open");
            })
        })
    }
    if(search_drawer_close) {
        search_drawer_close.addEventListener("click", () => {
            search_drawer.classList.remove("open");
        })
    }
    if(search_input) {
        search_input.addEventListener("keyup", () => {
            var filter = search_input.value;
            if(filter != '') {
                document.querySelector(".search-action__tab").style.display = "none"
            }else {
                document.querySelector(".search-action__tab").style.display = "flex"
            }
            product_titles.forEach(item => {
                var textValue = item.innerText;
                if((textValue.indexOf(filter) > -1) || (textValue.indexOf(filter.toUpperCase()) > -1)) {
                    item.closest(".search-product-item").style.display = "";
                }else {
                    item.closest(".search-product-item").style.display = "none";
                }
            })
        })
        search_input.addEventListener("input", () => {
            if(search_input.value == ''){
                document.querySelector(".search-action__tab").style.display = "flex"
            }
        })
    }
    if (search_item_selectors) {
        search_item_selectors.forEach(item => {
            item.addEventListener("click", () => {
                selector_count ++;
                choose_btn.style.display = "none";
                selected_btn.style.display = "block";
                selected_btn.querySelector(".select_items").innerHTML = selector_count;
                item.closest(".search-product-item").classList.add("active");
                item.closest(".search-product-item").querySelector(".bundle-quantity").value = 1;
                if(selector_count == 3) {
                    selected_btn.style.display = "none";
                    add_to_cart_btn.style.display = "block";
                    success_msg.style.display = "flex";
                    products.forEach(product => {
                        if(product.classList.contains("active")){
            
                        }else {
                            product.classList.add("not_active");
                        }
                        product.querySelector(".quantity__add").style.display = "none";
                    })
                }
            })
        })
    }
    if(minus_buttons){
        minus_buttons.forEach(minus => {
            minus.addEventListener("click", () => {
                selector_count --;
                var quantity_element = minus.closest(".search-product-item").querySelector(".bundle-quantity");
                var quantity = quantity_element.value - 1;
                quantity_element.value = quantity;
                if(quantity == 0) {
                    minus.closest(".search-product-item").querySelector(".bundle-quantity").value = 0;
                    minus.closest(".search-product-item").classList.remove("active");
                }
                if(selector_count == 0){
                    choose_btn.style.display = "block";
                    selected_btn.style.display = "none";
                    success_msg.style.display = "none";
                    add_to_cart_btn.style.display = "none";
                    products.forEach(product => {
                        if(product.classList.contains("not_active")){
                            product.classList.remove("not_active");
                        }
                        product.querySelector(".quantity__add").style.display = "block";
                    })
                }else {
                    choose_btn.style.display = "none";
                    selected_btn.style.display = "block";
                    selected_btn.querySelector(".select_items").innerHTML = selector_count;
                    success_msg.style.display = "none";
                    add_to_cart_btn.style.display = "none";
                    products.forEach(product => {
                        if(product.classList.contains("not_active")){
                            product.classList.remove("not_active");
                        }
                        product.querySelector(".quantity__add").style.display = "block";
                    })
                }
            })
        })
    }
    if(plus_buttons){
        plus_buttons.forEach(plus => {
            plus.addEventListener("click", () => {
                selector_count ++;
                var quantity_element = plus.closest(".search-product-item").querySelector(".bundle-quantity");
                var quantity = parseInt(quantity_element.value) + 1;
                quantity_element.value = quantity;
                if(quantity == 3 || selector_count == 3) {
                    
                    choose_btn.style.display = "none";
                    selected_btn.style.display = "none";
                    success_msg.style.display = "flex";
                    add_to_cart_btn.style.display = "block";
                    products.forEach(product => {
                        if(product.classList.contains("active")){
            
                        }else {
                            product.classList.add("not_active");
                        }
                        product.querySelector(".quantity__add").style.display = "none";
                    });
                }else {
                    choose_btn.style.display = "none";
                    selected_btn.style.display = "block";
                    selected_btn.querySelector(".select_items").innerHTML = selector_count;
                    success_msg.style.display = "none";
                    add_to_cart_btn.style.display = "none";
                }
            })
        })
    }
    add_to_cart_btn.addEventListener("click", () => {
        var active_products = document.querySelectorAll(".search-product-item.active");
        var actives = [];
        console.log(active_products);
        active_products.forEach(active_product => {
            var selected_value = active_product.querySelector(".search-product-item__title").innerHTML;
            console.log(selected_value);
            if(active_product.querySelector(".bundle-quantity").value == 3) {
                actives.push(selected_value);
                actives.push(selected_value);
                actives.push(selected_value);
            } else if(active_product.querySelector(".bundle-quantity").value == 2){
                actives.push(selected_value);
                actives.push(selected_value);
            }else {
                actives.push(selected_value);
            }
        })
        var select_option1 = document.querySelector(`.niccos-gift_products select[name='properties[Option 1]'] option[value='${actives[0]}']`);
        document.querySelector(`.niccos-gift_products select[name='properties[Option 1]']`).value = actives[0];
        document.querySelector(".mobile-niccos-form-control.search-option1 .mobile-placeholder").innerHTML = actives[0];
        document.querySelector(`.niccos-gift_products select[name='properties[Option 2]']`).value = actives[1];
        document.querySelector(`.niccos-gift_products select[name='properties[Option 3]']`).value = actives[2];
        document.querySelector(".mobile-niccos-form-control.search-option2 .mobile-placeholder").innerHTML = actives[1];
        document.querySelector(".mobile-niccos-form-control.search-option3 .mobile-placeholder").innerHTML = actives[2];
        document.querySelector(".main-product-form .product-form__buttons .product-form__submit").click();
        search_drawer.classList.remove("open");
    })
})