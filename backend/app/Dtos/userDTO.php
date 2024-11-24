<?php

namespace App\DTOs;

class UserDto
{
    public $id;
    public $email;
    public $isActivated;

    public function __construct($model)
    {
        $this->id = $model->id;
        $this->email = $model->email;
        $this->isActivated = $model->isActivated;
    }

        // Метод для преобразования в массив
        public function toArray()
        {
            return [
                'id' => $this->id,
                'email' => $this->email,
                'isActivated' => $this->isActivated,
            ];
        }
}
