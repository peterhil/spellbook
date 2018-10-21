<!-- Copyright (c) 2018 Peter Hillerström and contributors

     This Source Code Form is subject to the terms of the Mozilla Public
     License, v. 2.0. If a copy of the MPL was not distributed with this
     file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->
<popup-category-selector>

  <div class="form-group">
    <label for="category">Category</label>
    <div class="input-group">
      <input class="form-input" type="text" placeholder="Search by typing">
      <button class="btn btn-primary input-group-btn">Filter</button>
    </div>
  </div>

  <div class="form-group">
    <select name="category" ref="category" class="form-select form-input">
      <option>Kirjanmerkkipalkki</option>
      <option>Internet</option>
      <option>Programming</option>
      <option>Services</option>
    </select>
  </div>

</popup-category-selector>
