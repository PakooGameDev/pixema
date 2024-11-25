<?php

namespace App\DTOs;

class UserDto
{
    public $id;
    public $name;
    public $email;
    public $isActivated;

    public function __construct($model)
    {
        $this->id = $model->id;
        $this->name = $model->name;
        $this->email = $model->email;
        $this->isActivated = $model->isActivated;
    }

        // Метод для преобразования в массив
        public function toArray()
        {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email,
                'isActivated' => $this->isActivated,
            ];
        }
}
